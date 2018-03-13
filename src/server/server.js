const express = require(`express`);
const postsStore = require(`./posts/store`);
const imageStore = require(`./images/store`);
const postsRouter = require(`./posts/route`)(postsStore, imageStore);
require(`dotenv`).config();
const logger = require(`../logger`);
const ServerError = require(`./error/server-error`);

const app = express();

app.use(express.static(`static`));
app.use(`/api/posts`, postsRouter);
app.all(`*`, (req, res) => {
  res.status(501).json(ServerError.NOT_IMPLEMENTED).end();
});

const HOSTNAME = parseInt(process.env.SERVER_HOST, 10) || `127.0.0.1`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || `3000`;
const MINPORT = 1024;
const MAXPORT = 65536;

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute(arg) {
    const currentPort = (+arg >= MINPORT && +arg <= MAXPORT) ? arg : PORT;
    app.listen(currentPort, HOSTNAME, (err) => {
      if (err) {
        logger.error(err);
      }

      logger.info(`Server running at http://${HOSTNAME}:${currentPort}/`);
    });
  },
  app,
};

