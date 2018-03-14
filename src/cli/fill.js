require(`colors`);
const {generateEntity} = require(`../generator/generate-entity`);
const logger = require(`../logger`);
const postsStore = require(`../server/posts/store`);
const fs = require(`fs`);
const imageStore = require(`../server/images/store`);
const createStreamFromBuffer = require(`../server/util/buffer-to-stream`);
const {askForElements, closeRl, stopError} = require(`../generator/generator-util`);

module.exports = {
  name: `--fill`,
  description: `заполняет базу данных тестовыми данными`,
  execute() {

    askForElements()
        .then(async (result) => {
          for (let i = 0; i < result; i++) {
            let data = generateEntity();
            data.date = +new Date();

            const testImagePath = __dirname + `/../../static/photos/14.jpg`;

            const image = fs.readFileSync(testImagePath);

            const imageInfo = {
              path: `/api/posts/${data.date}/image`,
              mimetype: `image/jpeg`,
            };
            const buffer = new Buffer(image);

            await imageStore.save(imageInfo.path, createStreamFromBuffer(buffer));
            data.filename = imageInfo;

            await postsStore.savePost(data);

            logger.info(`generated and inserted data:`, data);
          }

          return result;
        })
        .catch(stopError)
        .then(closeRl)
        .then(() => process.exit(0));
  }
};
