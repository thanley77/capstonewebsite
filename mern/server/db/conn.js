const { MongoClient } = require("mongodb");
const DbUrl = process.env.ATLAS_URI;
const client = new MongoClient(DbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbs = {};

module.exports = {
  connectToServer: function (dbName, callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        const database = db.db(dbName);
        dbs[dbName] = database;
        console.log(`Successfully connected to MongoDB database '${dbName}'.`);
      }
      return callback(err);
    });
  },

  getDb: function (dbName) {
    return dbs[dbName];
  },
};
