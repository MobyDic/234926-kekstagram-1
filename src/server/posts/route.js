const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const postsSchema = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`../../generator/generate-entity`);

const postsRouter = new Router();

const upload = multer({storage: multer.memoryStorage()});


const posts = [...new Array(10)]
    .reduce((arr) => {
      arr.push(generateEntity());
      return arr;
    }, []);

const toPage = (data, skip, limit) => {
  const skipData = (typeof `number` && skip >= 0) ? parseInt(skip, 10) : 0;
  const limitData = (typeof `number` && limit >= 0) ? parseInt(limit, 10) : 50;

  return {
    data: data.slice(skipData, skipData + limitData),
    skip: skipData,
    limit: limitData,
    total: data.length
  };
};

postsRouter.use(bodyParser.json());

postsRouter.get(``, async(async (req, res) => {
  const {
    limit = 50,
    skip = 0,
  } = req.query;

  res.send(toPage(posts, skip, limit));
}));

postsRouter.get(`/:date`, async(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const post = posts.find((it) => it.date === date);
  if (!post) {
    res.status(404).end();
  } else {
    res.send(post);
  }
}));

postsRouter.post(``, upload.single(`filename`), (req, res) => {
  const data = req.body;

  data.filename = req.file || data.filename;

  const errors = validateSchema(data, postsSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  delete data.filename;
  res.send(data);
});

postsRouter.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof ValidationError) {
    data = exception.errors;
  }
  res.status(400).send(data);
  next();
});

module.exports = postsRouter;
