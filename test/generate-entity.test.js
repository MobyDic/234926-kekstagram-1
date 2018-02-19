const assert = require(`assert`);
const {generateEntity} = require(`../src/generate-entity`);

const defineItemLength = (item) => item.length <= 20;
const defineFirstChar = (item) => item.substr(0, 1) === `#`;
const defineBackspace = (item) => ~item.search(/\s/) === 0;
const defineUniqueElement = (item, i, arr) => ~arr.indexOf(item, i + 1) === 0;
const defineCommentLength = (item) => item.length <= 140;


describe(`Generate entity`, () => {
  const entity = generateEntity();

  describe(`generate url`, () => {
    it(`should return right type of url`, () => {
      assert.equal(typeof entity.url, `string`, `type of url is not string`);
    });
    it(`should return right url`, () => {
      assert.equal(entity.url.substr(0, 26), `https://picsum.photos/600/`, `invalid foto url`);
    });
  });

  describe(`generate scale`, () => {
    it(`should return right scale`, () => {
      assert.ok(entity.scale >= 0 && entity.scale <= 100, `scale is out of range`);
    });
  });

  describe(`generate effect`, () => {
    it(`should return right effect`, () => {
      assert.ok([
        `none`,
        `chrome`,
        `sepia`,
        `marvin`,
        `phobos`,
        `heat`
      ].includes(entity.effect), `effect error`);
    });
  });

  describe(`generate hashtags`, () => {
    it(`should return right type of hashtags`, () => {
      assert.ok(entity.hashtags instanceof Array, `hashtags is not array`);
    });
    it(`should return right array length hashtags`, () => {
      assert.ok(entity.hashtags.length === 5, `hashtags array length is not 5`);
    });
    it(`should return right hashtags elements length`, () => {
      assert.ok(entity.hashtags.every(defineItemLength), `hashtags element length more than 20`);
    });
    it(`should return right first character as #`, () => {
      assert.ok(entity.hashtags.every(defineFirstChar), `the first character of the hashtags element is not #`);
    });
    it(`should return right hashtags without backspace`, () => {
      assert.ok(entity.hashtags.every(defineBackspace), `hashtags element has backspace`);
    });
    it(`should return unique hashtags elements`, () => {
      assert.ok(entity.hashtags.every(defineUniqueElement), `hashtags elements is not unique`);
    });

  });

  describe(`generate description`, () => {
    it(`should return right type of description`, () => {
      assert.equal(typeof entity.description, `string`, `description is not string`);
    });
    it(`should return right length of description`, () => {
      assert.ok(entity.description.length <= 140, `description length more than 140`);
    });
  });

  describe(`generate likes`, () => {
    it(`should return right type of likes`, () => {
      assert.equal(typeof entity.likes, `number`, `likes is not number`);
    });
    it(`should return right range of likes`, () => {
      assert.ok(entity.likes >= 0 && entity.likes <= 1000, `likes is out of range`);
    });
  });

  describe(`generate comments`, () => {
    it(`should return right type of comments`, () => {
      assert.ok(entity.comments instanceof Array, `comments is not array`);
    });
    it(`should return right comments elements length`, () => {
      assert.ok(entity.comments.every(defineCommentLength), `comments element length more than 140`);
    });
  });

});
