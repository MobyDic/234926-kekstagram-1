const request = require(`supertest`);
const mockPostsRouter = require(`./mock-posts-router`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostsRouter);

describe(`GET /api/posts`, function () {
  it(`respond with array of json`, () => {
    return request(app)
        .get(`/api/posts`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
  });

  it(`unknown addres should return 404`, () => {
    return request(app)
        .get(`/api/asdfasdf`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-type`, /html/);
  });

});

