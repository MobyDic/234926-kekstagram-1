const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server/server`);

describe(`GET /api/posts`, function () {
  it(`respond with array of json`, () => {
    return request(app)
        .get(`/api/posts`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const posts = response.body;
          assert.equal(Object.keys(posts.data[0]).length, 8);
        });
  });
});
