const request = require(`supertest`);
const {app} = require(`../src/server/server`);

describe(`POST /api/posts`, function () {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/posts`).
        send({
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: `#тачка #огонь #car #bmwX5`,
          scale: 100
        }).
        expect(200, {
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: `#тачка #огонь #car #bmwX5`,
          scale: 100
        });
  });

});
