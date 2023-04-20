const { MongoClient } = require("mongodb");
const DbUrl = process.env.ATLAS_URI;
const client = new MongoClient(DbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbs = {};

// List of database names to connect to
const dbNames = ["pentests_hyatt", "pentests_ninjakiwi"];

// Connect to all databases
client.connect(function (err, db) {
  if (err) {
    console.error(err);
    return;
  }
  
  // For each database name, store the corresponding database object in the dbs object
  dbNames.forEach(function(dbName) {
    const database = db.db(dbName);
    dbs[dbName] = database;
    console.log(`Successfully connected to MongoDB database '${dbName}'.`);
  });
});

module.exports = {
  getDb: function (dbName) {
    return dbs[dbName];
  },
};
