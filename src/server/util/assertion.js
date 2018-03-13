const oneOf = (choices) => {
  return {
    assert(option) {
      return choices.indexOf(option) >= 0;
    },
    message: `should be one of [${choices}]`
  };
};

module.exports = {
  oneOf,
  anyOf(choices) {
    return {
      assert(options) {
        const assertion = oneOf(choices);
        return options.every((it) => assertion.assert(it));
      },
      message: `should be one of [${choices}]`
    };
  },
  inRange(from, to) {
    return {
      assert(number) {
        return number >= from && number <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  isNumber() {
    return {
      assert(number) {
        return !isNaN(number);
      },
      message: `should be a number`
    };
  },
  textRange(from, to) {
    return {
      assert(text) {
        return text.length >= from && text.length <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  isImage() {
    return {
      assert(image) {
        return image.mimetype.startsWith(`image/`);
      },
      message: `should be an image`
    };
  },
  unique() {
    return {
      assert(options) {
        const set = new Set(options);
        return set.size === options.length;
      },
      message: `should be unique`
    };
  },
  isHashtagLength(from, to) {
    return {
      assert(arr) {
        return arr.split(` `).every((item) => {
          return (item.length >= from && item.length <= to);
        });
      },
      message: `should be in range ${from}..${to}`
    };
  },
  isHashtagBegin() {
    return {
      assert(arr) {
        return arr.split(` `).every((item) => {
          return (item.substr(0, 1) === `#`);
        });
      },
      message: `should begin with #`
    };
  },
  maxItemHashtags(to) {
    return {
      assert(arr) {
        return arr.split(` `).length <= to;
      },
      message: `should be no more ${to}`
    };
  },

  uniqueHashtags() {
    return {
      assert(arr) {
        const options = arr.split(` `);
        const set = new Set(options);
        return set.size === options.length;
      },
      message: `should be unique`
    };
  },

};
