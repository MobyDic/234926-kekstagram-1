const ServerError = require(`../src/server/error/server-error`);
const request = require(`supertest`);
const app = require(`express`)();

app.all(`*`, (req, res) => {
  res.status(501).json(ServerError.NOT_IMPLEMENTED).end();
});


describe(`DELETE /api/posts`, () => {
  it(`should respond  501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(501, ServerError.NOT_IMPLEMENTED);
  });
});
