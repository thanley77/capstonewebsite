const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records for a specific database.
recordRoutes.route("/:db_name/httpx").get(function (req, res) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  db_connect
    .collection("httpx")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

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

recordRoutes.route("/:db_name/hosts").get(function (req, res) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  db_connect
    .collection("hosts")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/record/:db_name").get(function (req, res) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id for a specific database
recordRoutes.route("/record/:db_name/:id").get(function (req, res) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
   

