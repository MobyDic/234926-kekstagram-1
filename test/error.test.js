const ServerError = require(`../src/server/error/not-implemented`);
const request = require(`supertest`);
const app = require(`express`)();
const error = new ServerError();

app.all(`*`, (req, res) => {
  res.status(error.code).json(error).end();
});


describe(`DELETE /api/posts`, () => {
  it(`should respond  501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(501, error);
  });
});
