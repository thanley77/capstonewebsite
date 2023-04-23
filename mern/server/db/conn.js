
const { MongoClient } = require("mongodb");
const AtlasURI = process.env.ATLAS_URI;
const client = new MongoClient(AtlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _dbs = {};

module.exports = {
  connectToServer: function (dbName, callback) {
    client.connect(function (err, db) {
      if (err) {
        return callback(err);
      }
      _dbs[dbName] = db.db(dbName);
      console.log(`Successfully connected to MongoDB database ${dbName}.`);
      return callback();
    });
  },

  getDb: function (dbName) {
    return _dbs[dbName];
  },
};
