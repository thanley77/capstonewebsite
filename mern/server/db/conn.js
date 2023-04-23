const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (dbName, callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db(dbName);
        console.log(`Successfully connected to MongoDB database ${dbName}.`);
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
