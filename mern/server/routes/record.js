const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records for a specific database.
recordRoutes.route("/pentests_hyatt/httpx").get(function (req, res) {
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

recordRoutes.route("/pentests_hyatt/nmap").get(function (req, res) {
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

recordRoutes.route("/pentests_hyatt/hosts").get(function (req, res) {
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

recordRoutes.route("/record/pentests_hyatt").get(function (req, res) {
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
recordRoutes.route("/record/pentests_hyatt/:id").get(function (req, res) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record for a specific database.
recordRoutes.route("/record/add/pentests_hyatt").post(function (req, response) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id for a specific database.
recordRoutes.route("/update/pentests_hyatt/:id").post(function (req, response) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record for a specific database.
recordRoutes.route("/pentests_hyatt/:id").delete((req, response) => {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
