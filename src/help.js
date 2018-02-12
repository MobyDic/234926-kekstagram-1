require(`colors`);

function helpHandler(commands) {
  console.log([
    `Доступные команды:`,
    ...commands.map((command) => `${command.name.grey}\t${command.description.green}`)
  ].join(`\n`));
}

module.exports = {
  name: `--help`,
  description: `печатает текст`,
  execute: helpHandler
};
