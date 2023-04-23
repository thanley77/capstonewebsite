
const { MongoClient } = require("mongodb");
const AtlasURI = process.env.ATLAS_URI;
const client = new MongoClient(AtlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const databases = {
  pentests_ninjakiwi: null,
  pentests_hyatt: null,
  // add more databases here as needed
};

module.exports = {
  connectToServer: function (dbName, callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        databases[dbName] = db.db(dbName);
        console.log(`Successfully connected to ${dbName}.`);
      }
      return callback(err);
    });
  },

  getDb: function (dbName) {
    return databases[dbName];
  },
};

// connect to the databases
const dbConnector = require("./dbConnector");

dbConnector.connectToServer("pentests_ninjakiwi", function (err) {
  if (err) {
    console.log("Error connecting to pentests_ninjakiwi database", err);
  } else {
    console.log("Connected to pentests_ninjakiwi database");
  }
});

dbConnector.connectToServer("pentests_hyatt", function (err) {
  if (err) {
    console.log("Error connecting to pentests_hyatt", err);
  } else {
    console.log("Connected to other_database");
  }
});
