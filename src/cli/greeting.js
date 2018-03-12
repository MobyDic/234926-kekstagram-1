require(`colors`);
const helpModule = require(`./help`);
const generateFile = require(`../generator/generate-file`);

const packageInfo = require(`../../package.json`);

module.exports = {
  execute(commands) {
    console.log(`Привет пользователь! Эта программа будет запускать сервер «Кекстаграм».
Автор: ${packageInfo.author}`.green);

    helpModule.execute(commands);

    console.log(`Для работы сервера необходимо:
  1. Подключение БД (./mongod --dbpath '../data/db').
  2  Запуск сервера (node index --server [порт].`);

    generateFile.execute();
  }
};
