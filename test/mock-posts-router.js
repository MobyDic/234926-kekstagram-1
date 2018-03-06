const createPostsRouter = require(`../src/server/posts/route`);
const {generateEntity} = require(`../src/generator/generate-entity`);

const posts = [...new Array(10)]
    .reduce((arr) => {
      arr.push(generateEntity());
      return arr;
    }, []);


class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockPostStore {
  constructor() {
  }

  async getPost(date) {
    return posts.find((it) => it.date.toString() === date);
  }

  async getAllPosts() {
    return new Cursor(posts);
  }

  async savePost() {
  }

}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }

}

module.exports = createPostsRouter(new MockPostStore(), new MockImageStore());
