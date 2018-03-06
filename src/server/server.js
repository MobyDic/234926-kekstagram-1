const express = require(`express`);
const postsStore = require(`./posts/store`);
const imageStore = require(`./images/store`);
const postsRouter = require(`./posts/route`)(postsStore, imageStore);

const app = express();

app.use(express.static(`static`));
app.use(`/api/posts`, postsRouter);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;
const MINPORT = 1024;
const MAXPORT = 65536;

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute(arg) {
    const currentPort = (+arg >= MINPORT && +arg <= MAXPORT) ? arg : PORT;
    app.listen(currentPort, HOSTNAME, (err) => {
      if (err) {
        console.error(err);
      }
      console.log(`Server running at http://${HOSTNAME}:${currentPort}/`);
    });
  },
  app,
};

