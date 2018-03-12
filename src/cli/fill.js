require(`colors`);
const readline = require(`readline`);
const {generateEntity} = require(`../generator/generate-entity`);
const logger = require(`../logger`);
const postsStore = require(`../server/posts/store`);
const fs = require(`fs`);
const imageStore = require(`../server/images/store`);
const createStreamFromBuffer = require(`../server/util/buffer-to-stream`);


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
          process.exit(1);
        }
      });
    });

    askForElements()
        .then(async (result) => {
          for (let i = 0; i < result; i++) {
            let data = generateEntity();
            data.date = +new Date();

            const testImagePath = __dirname + `/../../test/keks.png`;

            const image = fs.readFileSync(testImagePath, `utf8`);

            const imageInfo = {
              path: `/api/posts/${data.date}/image`,
              mimetype: `image/jpeg`,
            };
            const buffer = new Buffer(image);

            await imageStore.save(imageInfo.path, createStreamFromBuffer(buffer));
            data.filename = imageInfo;

            postsStore.savePost(data);

            logger.info(`generated and inserted data:`, data);
          }

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
};
