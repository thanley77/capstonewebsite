const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/:db_name/httpx").get(function (req, res) {
  let dbName = req.params.db_name;
  dbo.connectToServer(dbName, function (err) {
    if (err) throw err;

    let db_connect = dbo.getDb(dbName);
    db_connect
      .collection("httpx")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
});

// Get all nmap records for a specific database
recordRoutes.route("/:db_name/nmap").get(function (req, res) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  db_connect
    .collection("nmap")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;
