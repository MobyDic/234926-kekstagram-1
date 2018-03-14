module.exports = class NotImplemented extends Error {
  constructor() {
    super();
    this.code = 501;
    this.message = `Not Implemented`;
    this.errorMessage = `Request method is not supported by the server.`;
  }
};
