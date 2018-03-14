module.exports = class InternalServerError extends Error {
  constructor() {
    super();
    this.code = 500;
    this.message = `Internal Server Error`;
    this.errorMessage = `Server has fallen into unrecoverable problem.`;
  }
};
