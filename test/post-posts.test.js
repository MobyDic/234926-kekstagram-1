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

  it(`should consume form-data with filename`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`description`, mock.description)
        .field(`effect`, mock.effect)
        .field(`hashtags`, mock.hashtags)
        .field(`scale`, mock.scale)
        .attach(`filename`, `test/keks.png`)
        .expect(200, mock);
  });

  it(`should fail and show right error messages`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`description`, mock.effect)
        .field(`effect`, mock.effect)
        .field(`hashtags`, mock.hashtags)
        .field(`post-scale`, mock.scale)
        .attach(`filename`, `test/keks.png`)
        .expect(400, [
          {
            fieldName: `scale`,
            errorMessage: `is required`
          }
        ]);
  });
});
