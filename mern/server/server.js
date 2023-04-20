const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const conn = require("./db/conn");

// Connect to multiple databases
conn.connectToServer("database1", function (err) {
  if (err) throw err;
});
conn.connectToServer("database2", function (err) {
  if (err) throw err;
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(require("./routes/record"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
