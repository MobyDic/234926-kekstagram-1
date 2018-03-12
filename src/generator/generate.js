const {generateEntity} = require(`./generate-entity`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const logger = require(`../logger`);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
let data = [];

module.exports = {
  name: `generateEntity`,
  description: `Generates data for project`,
  execute([count, filePath]) {
    for (let i = 0; i < count; i++) {
      data.push(generateEntity());
    }
    logger.debug(`generated data:`, data);
    return writeFile(`${process.cwd()}/${filePath}`, JSON.stringify(data), fileWriteOptions);
  }
};
