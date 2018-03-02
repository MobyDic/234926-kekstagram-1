require(`colors`);

function unknownHandler(command) {
  console.log(`Неизвестная команда ${command}. Чтобы прочитать правила использования приложения, наберите "--help"`.red);
  process.exit(1);
}

module.exports = {
  execute: unknownHandler,
};
