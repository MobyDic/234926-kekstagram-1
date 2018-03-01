const assert = require(`assert`);
const generate = require(`../src/generator/generate`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Generate JSON file`, function () {
  it(`should fail on not existing folder`, function () {
    const tempFileName = `folder/testfile.json`;
    const count = 1;
    return generate.execute([count, tempFileName])
        .then(() => assert.fail(`Path ${tempFileName} should not be available`))
        .catch((e) => assert.ok(e));
  });

  it(`should create new file`, function () {
    const tmpFileName = `test/testfile.json`;
    const count = 2;
    return generate.execute([count, tmpFileName])
        .then(() => access(tmpFileName))
        .then(() => unlink(tmpFileName));
  });

});
