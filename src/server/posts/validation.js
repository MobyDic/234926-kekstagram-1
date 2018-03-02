const {textRange, isImage, oneOf, inRange, isHashtagLength} = require(`../util/assertion`);

const MAX_SCALE_LENGTH = 100;
const MIN_SCALE_LENGTH = 0;
const EFFECTS = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
const MIN_DESCRIPT_LENGTH = 0;
const MAX_DESCRIPT_LENGTH = 140;


const schema = {
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
      isHashtagLength(1, 20)
    ]
  },
  'description': {
    required: false,
    assertions: [
      textRange(MIN_DESCRIPT_LENGTH, MAX_DESCRIPT_LENGTH)
    ]
  }

};

module.exports = schema;
