const effectAll = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
const hastagsAll = [`#keks`, `#cat`, `#friend`, `#happy`, `#kote`, `#kekstagram`, `#favorite`, `#kitten`, `#ciute`];
const comments = [`1111111111111`, `2222222222222222`, `3333333333333333`, `4444444444444`, `55555555555`];

function randomArray(arr, lengthResultArr) {
  let result = [];
  let array = arr.slice();
  while (result.length !== lengthResultArr) {
    let indexArr = Math.floor(Math.random() * array.length);
    result.push(array[indexArr]);
    array.splice(indexArr, 1);
  }
  console.log(result);
  return result;
}

function generateEntity() {
  return {
    'url': `https://picsum.photos/600/${Math.random().toString(10)}`,
    'scale': Math.floor(Math.random() * 100),
    'effect': effectAll[Math.floor(Math.random() * effectAll.length)],
    'hashtags': randomArray(hastagsAll, 5),
    'description': `Произвольный текст`,
    'likes': Math.floor(Math.random() * 1000),
    'comments': randomArray(comments, 5)
  };
}

module.exports = {
  generateEntity
};
