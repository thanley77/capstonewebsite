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

recordRoutes.route("/:db_name/httpx/create").post(function (req, res) {
  let dbName = req.params.db_name;
  let db_connect = dbo.getDb(dbName);
  let httpx = {
    input: req.body.input,
    host: req.body.host,
    location: req.body.location,
    title: req.body.title,
    scheme: req.body.scheme,
    method: req.body.method,
    webserver: req.body.webserver,
  };
  db_connect.collection("httpx").insertOne(httpx, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "HTTPX record created successfully" });
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
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record for a specific database.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb("pentests_ninjakiwi");
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
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("pentests_ninjakiwi");
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
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb("pentests_ninjakiwi");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
