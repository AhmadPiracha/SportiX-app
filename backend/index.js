const express = require("express");
const http = require("http");

var connection = require("./config/db.js");
var app = express();

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000.");
  connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connected to database");
  });
});