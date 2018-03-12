const readline = require(`readline`);
const fs = require(`fs`);
const generate = require(`./generate`);
const logger = require(`../logger`);


function generateFile() {
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
        process.exit(1);
      }
    });
  });

  const askForPath = (elements) => new Promise((resolve) => {
    rl.question(`Укажите путь до файла: `, (path) => resolve([elements, path]));
  });

  const askForExistingFile = (data) => new Promise((resolve) => {
    fs.exists(data[1], (exists) => exists
      ? rl.question(`Файл уже существует, перезаписать? (y/n) `, (answer) => answer === `y` ? resolve(data) : process.exit(1))
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
          logger.error(err);
          process.exit(1);
        }
        return (err);
      })
      .then(() => rl.close())
      .then(() => process.exit(0));
}

module.exports = {
  name: `generateFile`,
  description: `Generates data for project in file`,
  execute: generateFile
};
