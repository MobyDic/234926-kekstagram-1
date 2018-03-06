const request = require(`supertest`);
// const assert = require(`assert`);
// const {app} = require(`../src/server/server`);

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
    // .then((response) => {
    //   const posts = response.body;
    //   assert.equal(Object.keys(posts.data[0]).length, 8);
    // });
  });

  // it(`should find offer by date`, async () => {
  //   let date;
  //   await request(app)
  //       .get(`/api/posts`)
  //       .set(`Accept`, `application/json`)
  //       .expect(200)
  //       .expect(`Content-Type`, /json/)
  //       .then((response) => {
  //         const posts = response.body;
  //         date = posts.data[0].date;
  //       });

  //   return request(app)
  //       .get(`/api/posts/${date}`)
  //       .set(`Accept`, `application/json`)
  //       .expect(200)
  //       .expect(`Content-Type`, /json/)
  //       .then((response) => {
  //         const posts = response.body;
  //         assert.equal(posts.date, date);
  //       });
  // });

  it(`unknown addres should return 404`, () => {
    return request(app)
        .get(`/api/asdfasdf`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-type`, /html/);
  });

});

