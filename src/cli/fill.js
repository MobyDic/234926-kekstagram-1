require(`colors`);
const readline = require(`readline`);
const {generateEntity} = require(`../generator/generate-entity`);
const logger = require(`../logger`);
const postsStore = require(`../server/posts/store`);


module.exports = {
  name: `--fill`,
  description: `заполняет базу данных тестовыми данными`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });


    const askForElements = () => new Promise((resolve) => {
      rl.question(`Сколько тестовых записей необходимо вставить в БД? `.green, (elements) => {
        if (!isNaN(elements)) {
          resolve(elements);
        } else {
          console.log(`Ошибка в числе`);
          rl.close();
        }
      });
    });

    askForElements()
        .then((result) => {
          for (let i = 0; i < result; i++) {
            let data = generateEntity();
            postsStore.savePost(data);
            logger.info(`generated and inserted data:`, data);
          }

          return result;
        })
        .catch((err) => {
          if (err) {
            logger.error(err);
          }
          return (err);
        })
        .then(() => rl.close());
  }
};
