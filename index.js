const arg = process.argv.slice(2);

const authorModule = require(`./src/author`);
const descriptionModule = require(`./src/description`);
const versionModule = require(`./src/version`);
const greetingModule = require(`./src/greeting`);
const licenseModule = require(`./src/license`);
const helpModule = require(`./src/help`);
const unknownModule = require(`./src/unknown`);
const server = require(`./src/server`);


const commands = [
  versionModule,
  helpModule,
  descriptionModule,
  authorModule,
  licenseModule,
  server
];

if (arg[0]) {

  const currentCommand = commands.find((command) => arg[0] === command.name);
  if (currentCommand) {
    currentCommand.execute(commands);
    process.exit(0);
  } else {
    unknownModule.execute(arg[0]);
    process.exit(1);
  }

} else {
  greetingModule.execute();
}
