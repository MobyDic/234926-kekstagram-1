const arg = process.argv.slice(2);

const authorModule = require(`./cli/author`);
const descriptionModule = require(`./cli/description`);
const versionModule = require(`./cli/version`);
const greetingModule = require(`./cli/greeting`);
const licenseModule = require(`./cli/license`);
const helpModule = require(`./cli/help`);
const unknownModule = require(`./cli/unknown`);
const server = require(`./server/server`);
const fillModule = require(`./cli/fill`);


const commands = [
  versionModule,
  helpModule,
  descriptionModule,
  authorModule,
  licenseModule,
  fillModule,
  server
];

if (arg[0]) {

  const currentCommand = commands.find((command) => arg[0] === command.name);
  if (currentCommand) {
    switch (arg[0]) {
      case `--server`:
        currentCommand.execute(arg[1]);
        break;
      case `--help`:
        currentCommand.execute(commands);
        break;
      default: currentCommand.execute();
    }

  } else {
    unknownModule.execute();
    process.exit(1);
  }

} else {
  greetingModule.execute();
}
