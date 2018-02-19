require(`colors`);
const readline = require(`readline`);
const fs = require(`fs`);
const generate = require(`./generate`);


const packageInfo = require(`../package.json`);

module.exports = {
  execute() {
    console.log(`Привет пользователь! Эта программа будет запускать сервер «Кекстаграм». Автор:${packageInfo.author}`.green);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askForGenerate = () => new Promise((resolve, reject) => {
      rl.question(`Cгенерировать данные (y/n)?`, (answer) => answer === `y` ? resolve() : reject());
    });

    const askForElements = () => new Promise((resolve) => {
      rl.question(`Сколько элементов необходимо создать? `, (elements) => {
        if (!isNaN(elements)) {
          resolve(elements);
        } else {
          console.log(`Ошибка в числе`);
          rl.close();
        }
      });
    });

    const askForPath = (elements) => new Promise((resolve) => {
      rl.question(`Укажите путь до файла: `, (path) => resolve([elements, path]));
    });

    const askForExistingFile = (data) => new Promise((resolve) => {
      fs.exists(data[1], (exists) => exists
        ? rl.question(`Файл уже существует, перезаписать? (y/n) `, (answer) => answer === `y` ? resolve(data) : rl.close())
        : resolve(data)
      );
    });

    askForGenerate()
        .then(askForElements)
        .then(askForPath)
        .then(askForExistingFile)
        .then((result) => {
          generate.execute(result);
          console.log(`Файл создан!`);
          return result;
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
          return (err);
        })
        .then(() => rl.close());
  }
};
