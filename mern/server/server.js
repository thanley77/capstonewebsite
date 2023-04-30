const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const nmapImport = require("./nmap_import");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(require("./routes/record"));

app.post("/api/import-nmap", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const result = await nmapImport.importNmap(file.path);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error importing nmap scan!" });
  }
});

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
