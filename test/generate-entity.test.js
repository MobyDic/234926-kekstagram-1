const assert = require(`assert`);
const {generateEntity} = require(`../src/generate-entity`);

describe(`Generate entity`, () => {
  const entity = generateEntity();
  it(`should return right data`, () => {
    assert.equal(typeof entity.url, `string`, `url error`);
    assert.equal(entity.url.substr(0, 26), `https://picsum.photos/600/`, `invalid foto url`);
    assert.ok(entity.scale >= 0 && entity.scale <= 100, `scale is out of range`);
    assert.ok([
      `none`,
      `chrome`,
      `sepia`,
      `marvin`,
      `phobos`,
      `heat`
    ].includes(entity.effect), `effect error`);

    assert.ok(entity.hashtags instanceof Array, `hashtags is not array`);
    assert.ok(entity.hashtags.length === 5, `hashtags array length is not 5`);
    assert.ok(entity.hashtags.every((item) => item.length <= 20), `hashtags element length more than 20`);
    assert.ok(entity.hashtags.every((item) => item.substr(0, 1) === `#`), `the first character of the hashtags element is not #`);
    assert.ok(entity.hashtags.every((item) => item.search(/\s/) === -1), `hashtags element has backspace`);
    assert.ok(entity.hashtags.every((item, i, arr) => arr.indexOf(item, i + 1) === -1), `hashtags elements is not unique`);

    assert.equal(typeof entity.description, `string`, `description is not string`);
    assert.ok(entity.description.length <= 140, `description length more than 140`);

    assert.equal(typeof entity.likes, `number`, `likes is not number`);
    assert.ok(entity.likes >= 0 && entity.likes <= 1000, `likes is out of range`);

    assert.ok(entity.comments instanceof Array, `comments is not array`);
    assert.ok(entity.comments.every((item) => item.length <= 140), `comments element length more than 140`);

  });
});
