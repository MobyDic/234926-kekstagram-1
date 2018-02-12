function helpHandler(commands) {
  console.log([
    `Доступные команды:`,
    ...commands.map((command) => `${command.name}\t${command.description}`)
  ].join(`\n`));
}

module.exports = {
  name: `--help`,
  description: `печатает текст`,
  execute: helpHandler
};
