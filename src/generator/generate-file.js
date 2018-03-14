const generate = require(`./generate`);
// const logger = require(`../logger`);
const {
  askForGenerate,
  askForElements,
  askForPath,
  askForExistingFile,
  closeRl,
  stopError
} = require(`./generator-util`);


function generateFile() {

  askForGenerate()
      .then(askForElements)
      .then(askForPath)
      .then(askForExistingFile)
      .then(async (result) => {
        await generate.execute(result);
        console.log(`Файл создан!`);
        return result;
      })
      .catch(stopError)
      .then(closeRl)
      .then(() => process.exit(0));

}

module.exports = {
  name: `generateFile`,
  description: `Generates data for project in file`,
  execute: generateFile
};
