const request = require(`supertest`);
const {app} = require(`../src/server/server`);

const mock = {
  description: `Самая красивая тачка на этой планете`,
  effect: `chrome`,
  hashtags: `#тачка #огонь #car #bmwX5`,
  scale: 100
};

describe(`POST /api/posts`, function () {
  it(`should consume JSON`, () => {
    return request(app).
        post(`/api/posts`).
        send({
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: `#тачка #огонь #car #bmwX5`,
          scale: 100
        }).
        expect(200, mock);

  });

  it(`should consume form-data`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`description`, mock.description)
        .field(`effect`, mock.effect)
        .field(`hashtags`, mock.hashtags)
        .field(`scale`, mock.scale)
        .expect(200, mock);
  });

  it(`should fail and show right error messages`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`effect`, `nonee`)
        .field(`hashtags`, `#keks`)
        .field(`scale`, 100)
        .expect(400, [
          {
            fieldName: `effect`,
            errorMessage: `should be in range one of [none, chrome, sepia, marvin, phobos, heat]`
          },
          {
            fieldName: `hashtags`,
            errorMessage: `is required`
          },
          {
            fieldName: `scale`,
            errorMessage: `should be in range 0..100`,
          },
          {
            fieldName: `description`,
            errorMessage: `is required`
          }

        ]);
  });
});
