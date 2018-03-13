const {
  textRange,
  isImage,
  isNumber,
  oneOf,
  inRange,
  isHashtagLength,
  isHashtagBegin,
  maxItemHashtags,
  uniqueHashtags
} = require(`../util/assertion`);

const MAX_SCALE_LENGTH = 100;
const MIN_SCALE_LENGTH = 0;
const EFFECTS = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
const MIN_DESCRIPT_LENGTH = 0;
const MAX_DESCRIPT_LENGTH = 140;


const postsSchema = {
  'filename': {
    required: true,
    assertions: [
      isImage()
    ]
  },
  'scale': {
    required: true,
    assertions: [
      inRange(MIN_SCALE_LENGTH, MAX_SCALE_LENGTH)
    ]
  },
  'effect': {
    required: true,
    assertions: [
      oneOf(EFFECTS)
    ]
  },
  'hashtags': {
    required: false,
    converter(val) {
      return val.trim();
    },
    assertions: [
      isHashtagLength(1, 20),
      isHashtagBegin(),
      maxItemHashtags(5),
      uniqueHashtags()
    ]
  },
  'description': {
    required: false,
    assertions: [
      textRange(MIN_DESCRIPT_LENGTH, MAX_DESCRIPT_LENGTH)
    ]
  }

};

const paramsSchema = {
  'skip': {
    required: false,
    assertions: [
      isNumber()
    ]
  },
  'limit': {
    required: false,
    assertions: [
      isNumber()
    ]
  }
};

module.exports = {postsSchema, paramsSchema};
