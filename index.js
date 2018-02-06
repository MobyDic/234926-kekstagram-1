const arg = process.argv.slice(2);

if(arg[0]) {
 switch(arg[0]) {
    case `--version`:
      console.log(`v0.0.1`);
      process.exit(0);
      break;
    case `--help`:
      console.log(`Доступные команды:`);
      console.log(`--help — печатает этот текст;`);
      console.log(`--version — печатает версию приложения;`);
      process.exit(0);
      break;
    default:
      console.error(`Неизвестная команда  ${arg[0]}. Чтобы прочитать правила использования приложения, наберите "--help"`);
      process.exit(1);
  }
} else {
  console.log(`Привет пользователь! Эта программа будет запускать сервер «Кекстаграм». Автор: Кекс.`);
}
