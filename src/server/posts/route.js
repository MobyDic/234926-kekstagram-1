const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const {postsSchema, paramsSchema} = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const dataRenderer = require(`../util/data-renderer`);
const NotFoundError = require(`../error/not-found-error`);
const logger = require(`../../logger`);
const ServerError = require(`../error/server-error`);

const CodeStatus = {
  OK: 200,
  VALIDATION_ERROR: 400,
  NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501
};

const postsRouter = new Router();

const upload = multer({storage: multer.memoryStorage()});


const toPage = async (data, skip, limit) => {

  const skipData = (Number(skip) >= 0) ? parseInt(skip, 10) : 0;
  const limitData = (Number(limit) >= 0) ? parseInt(limit, 10) : 50;

  return {
    data: await (data.skip(skipData).limit(limitData).toArray()),
    skip: skipData,
    limit: limitData,
    total: await data.count()
  };
};

postsRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

postsRouter.use(bodyParser.json());

postsRouter.get(``, async(async (req, res) => {
  const {
    limit = 50,
    skip = 0,
  } = req.query;


  const errors = validateSchema(req.query, paramsSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  const post = await toPage(await postsRouter.postsStore.getAllPosts(), skip, limit);
  logger.debug(`get `, post);
  res.send(post);
}));

postsRouter.get(`/:date`, async(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const post = await postsRouter.postsStore.getPost(date);
  if (!post) {
    throw new NotFoundError(`Post not found`);
  } else {
    logger.debug(`get /:date `, post);
    res.send(post);
  }
}));

postsRouter.get(`/:date/image`, async(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const post = await postsRouter.postsStore.getPost(date);
  if (!post) {
    throw new NotFoundError(`Post not found`);
  }

  const image = post.filename;
  if (!image) {
    throw new NotFoundError(`Post didn't upload image`);
  }
  logger.debug(`get image} `, image);
  const {info, stream} = await postsRouter.imageStore.get(image.path);

  if (!info) {
    throw new NotFoundError(`File not found`);
  }
  res.set(`content-type`, image.mimetype);
  res.set(`content-length`, info.length);
  res.status(CodeStatus.OK);
  stream.pipe(res);
}));

postsRouter.post(``, upload.single(`filename`), async(async (req, res) => {
  const data = req.body;
  const image = req.file;

  data.filename = image || data.filename;
  data.date = data.date || +new Date();

  logger.debug(`put data `, data);
  const errors = validateSchema(data, postsSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  if (image) {
    const imageInfo = {
      path: `/api/posts/${data.date}/image`,
      mimetype: image.mimetype,
    };
    await postsRouter.imageStore.save(imageInfo.path, createStreamFromBuffer(image.buffer));
    data.filename = imageInfo;
  }

  await postsRouter.postsStore.savePost(data);
  dataRenderer.renderDataSuccess(req, res, data);

}));

postsRouter.use((exception, req, res, next) => {
  let data = exception;

  if (exception instanceof ValidationError) {
    data = exception.errors;
    return res.status(CodeStatus.VALIDATION_ERROR).send(data);
  }

  if (exception instanceof NotFoundError) {
    return res.status(CodeStatus.NOT_FOUND_ERROR).send(data);
  }

  if (!(exception instanceof NotFoundError) && !(exception instanceof ValidationError)) {
    return res.status(CodeStatus.INTERNAL_SERVER_ERROR).json(ServerError.INTERNAL_SERVER_ERROR);
  }

  return next();

});

// postsRouter.all(`*`, (req, res) => {
//   res.status(CodeStatus.NOT_IMPLEMENTED).json(ServerError.NOT_IMPLEMENTED).end();
// });

module.exports = (postsStore, imageStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imageStore = imageStore;
  return postsRouter;
};
