const MongoClient = require("mongodb").MongoClient;
const mongodbUri = require("mongodb-uri");

let _db;

const initDb = async dbUrl => {
  if (_db) {
    console.warn("Trying to init DB again!");
    return _db;
  }

  try {
    const client = await MongoClient.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const dbUriObj = mongodbUri.parse(dbUrl);
    const db = client.db(dbUriObj.database);

    /* admin collections */
    db.posts = db.collection("posts");
    /* admin collections */

    _db = db;
    return _db;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getDb = () => {
  return _db;
};

module.exports = { getDb, initDb };
