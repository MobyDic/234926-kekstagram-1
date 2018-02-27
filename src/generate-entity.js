const effectAll = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
const hastagsAll = [`#keks`, `#cat`, `#friend`, `#happy`, `#kote`, `#kekstagram`, `#favorite`, `#kitten`, `#ciute`];
const comments = [`Всё отлично!`,
  `Здорово!`,
  `Красиво!`,
  `В целом всё неплохо. Но не всё.`,
  `Так себе`,
  `В конце концов, это просто непрофессионально.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше`
];

function randomArray(arr, lengthResultArr) {
  let result = [];
  let array = arr.slice();
  while (result.length !== lengthResultArr) {
    let indexArr = Math.floor(Math.random() * array.length);
    result.push(array[indexArr]);
    array.splice(indexArr, 1);
  }
  return result;
}

function getRandomItem(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateEntity() {


  return {
    'url': `https://picsum.photos/600/${getRandomItem(100, 1000)}`,
    'scale': getRandomItem(0, 100),
    'effect': effectAll[getRandomItem(0, effectAll.length)],
    'hashtags': randomArray(hastagsAll, 5),
    'description': `Произвольный текст`,
    'likes': getRandomItem(0, 1000),
    'comments': randomArray(comments, 5),
    'date': new Date().setDate(getRandomItem(1, 28)),
  };
}

module.exports = {
  generateEntity
};
