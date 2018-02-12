require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `--version`,
  description: `печатает версию приложения`,
  execute() {
    const [major, minor, patch] = packageInfo.version.split(`.`);
    console.log(`v${major.red}.${minor.green}.${patch.blue}`);
  }
};
