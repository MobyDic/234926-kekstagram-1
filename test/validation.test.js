const {validate} = require(`../src/server/util/validator`);

const schema = require(`../src/server/posts/validation`);
const assert = require(`assert`);

const assertField = (fieldName, fieldValue, ...errorMessages) => {

  const expected = errorMessages.map((errorMessage) => ({
    fieldName, fieldValue, errorMessage
  }));

  const actual = validate({[fieldName]: fieldValue}, fieldName, schema[fieldName]);

  assert.deepEqual(actual, expected);
};

describe(`validate fields`, () => {
  describe(`'filename' field validation`, () => {
    const fieldName = `filename`;

    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });


    it(`should be an image/jpg, image/png`, () => {
      assertField(fieldName, {mimetype: `text/html`}, `should be an image`);
      assertField(fieldName, {mimetype: `video/mpeg`}, `should be an image`);
      assertField(fieldName, {mimetype: `audio/mpeg`}, `should be an image`);
    });
  });

  describe(`'scale' field validation`, () => {
    const fieldName = `scale`;

    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`should be in the range from 0 to 100`, () => {
      assertField(fieldName, 200, `should be in range 0..100`);
      assertField(fieldName, `-1`, `should be in range 0..100`);
      assertField(fieldName, `sss `, `should be in range 0..100`);
    });

  });

  describe(`'effect' field validation`, () => {
    const fieldName = `effect`;

    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`should be one of the values`, () => {
      assertField(fieldName, 200, `should be one of [none,chrome,sepia,marvin,phobos,heat]`);
      assertField(fieldName, `blue`, `should be one of [none,chrome,sepia,marvin,phobos,heat]`);
      assertField(fieldName, `sss `, `should be one of [none,chrome,sepia,marvin,phobos,heat]`);
    });

  });

  describe(`'description' field validation`, () => {
    const fieldName = `description`;


    it(`should be in the range from 0 to 140`, () => {
      assertField(fieldName, `a`.repeat(141), `should be in range 0..140`);
    });

  });

  describe(`'hashtags' field validation`, () => {
    const fieldName = `hashtags`;

    it(`should be in the range from 0 to 140`, () => {
      assertField(fieldName, `#supermegakeksthebestcat #mega`, `should be in range 1..20`);
    });

    it(`should begin with #`, () => {
      assertField(fieldName, `super #mega fantastic`, `should begin with #`);
    });

    it(`should be no more than 5 item`, () => {
      assertField(fieldName, `#super #mega #fantastic #тачка #огонь #car`, `should be no more 5`);
    });

    it(`should be unique item`, () => {
      assertField(fieldName, `#super #mega #super #car`, `should be unique`);
    });
  });
});
