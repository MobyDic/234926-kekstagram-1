const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);

const readfile = promisify(fs.readFile);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const mimeType = {
  '.css': `text/css`,
  '.html': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.png': `image/png`,
  '.gif': `image/gif`,
  '.ico': `image/x-icon`
};

const readFile = async (filePath, res) => {
  const data = await readfile(filePath);
  const ext = path.extname(filePath);

  res.setHeader(`Content-type`, mimeType[ext] || `text/plain`);
  res.setHeader(`Content-length`, Buffer.byteLength(data));

  res.end(data);
};


const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  if (pathname === `/`) {
    pathname = pathname + `index.html`;
  }
  const absolutePath = `${__dirname}/../static${pathname}`;

  (async () => {
    try {
      res.statusCode = 200;
      res.statusMessage = `OK`;
      await readFile(absolutePath, res);
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute() {
    server.listen(PORT, HOSTNAME, (err) => {
      if (err) {
        console.error(err);
      }
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  }
};
