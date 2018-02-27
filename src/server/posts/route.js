const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const postsSchema = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`../../generate-entity`);

const postsRouter = new Router();

const upload = multer({storage: multer.memoryStorage()});


const posts = [...new Array(5)]
    .reduce((arr) => {
      arr.push(generateEntity());
      return arr;
    }, []);

const toPage = (data, skip = 0, limit = 50) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

postsRouter.use(bodyParser.json());

postsRouter.get(``, async(async (req, res) => res.send(toPage(posts))));

postsRouter.get(`/:date`, async(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const post = posts.find((it) => it.date === date);
  if (!post) {
    res.status(404).end();
  } else {
    res.send(post);
  }
}));

postsRouter.post(``, upload.single(`post`), (req, res) => {
  const data = req.body;
  const errors = validateSchema(data, postsSchema);
  console.log(errors);
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

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
