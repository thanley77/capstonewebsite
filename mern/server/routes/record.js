const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/pentests_hyatt/httpx").get(function (req, res) {
  dbo.connectToServer("pentests_hyatt", function (err) {
    if (err) throw err;

    let db_connect = dbo.getDb();
    db_connect
      .collection("httpx")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
});

recordRoutes.route("/pentests_ninjakiwi/httpx").get(function (req, res) {
  dbo.connectToServer("pentests_ninjakiwi", function (err) {
    if (err) throw err;

    let db_connect = dbo.getDb();
    db_connect
      .collection("httpx")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
});

module.exports = recordRoutes;

