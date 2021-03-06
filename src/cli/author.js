require(`colors`);

const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--author`,
  description: `печатает автора приложения`,
  execute() {
    console.log(`${packageInfo.author.green}`);
    process.exit(0);
  }
};
