const request = require(`supertest`);
const mockPostsRouter = require(`./mock-posts-router`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostsRouter);

const mock = {
  description: `Самая красивая тачка на этой планете`,
  effect: `chrome`,
  hashtags: `#тачка #огонь #car #bmwX5`,
  scale: `100`,
  filename: {
    mimetype: `image/png`,
    path: `/api/posts/111111/image`
  },
  date: `111111`
};


describe(`POST /api/posts`, function () {
  it(`should consume JSON`, () => {
    return request(app).
        post(`/api/posts`).
        send({
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: `#тачка #огонь #car #bmwX5`,
          scale: `100`,
          filename: {
            mimetype: `image/png`,
            path: `/api/posts/111111/image`
          },
          date: `111111`
        }).
        expect(200, mock);
  });

  it(`should consume form-data with filename`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`description`, mock.description)
        .field(`effect`, mock.effect)
        .field(`hashtags`, mock.hashtags)
        .field(`scale`, mock.scale)
        .field(`date`, mock.date)
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
