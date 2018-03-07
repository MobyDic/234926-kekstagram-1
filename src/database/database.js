const {MongoClient} = require(`mongodb`);
require(`dotenv`).config();
const logger = require(`../logger`);

const url = `mongodb://${process.env.DB_HOST}`;

module.exports = MongoClient.connect(url).
    then((client) => client.db(`kekstagram`)).
    catch((e) => {
      logger.error(`Failed to connect to MongoDB`, e);
      process.exit(1);
    });
