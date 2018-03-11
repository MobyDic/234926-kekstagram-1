const ServerError = require(`../src/server/error/server-error`);
const request = require(`supertest`);
const mockPostsRouter = require(`./mock-posts-router`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostsRouter);

describe(`DELETE /api/posts`, () => {
  it(`should respond  501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(501, ServerError.NOT_IMPLEMENTED);
  });
});
