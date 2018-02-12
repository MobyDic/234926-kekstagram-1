const packageInfo = require(`../package.json`);

module.exports = {
  execute() {
    console.log(`Привет пользователь! Эта программа будет запускать сервер «Кекстаграм». Автор:${packageInfo.author}`);
  }
};
