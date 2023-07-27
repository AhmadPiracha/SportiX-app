const express = require("express");
const mysql = require("mysql2");
const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());


// Create connection to database

const connection = mysql.createConnection({
  host: "localhost",
  database: "sportix",
  user: "root",
  password: "password",
});
module.exports=connection;

app.get("/getTeams", function (req, res) {
  let sql = "SELECT * FROM teams WHERE type='cricket'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/teamSchedule", function (req, res) {
  let sql = "SELECT * FROM teamschedule WHERE type='cricket'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});



app.get("/getPlayers", function (req, res) {
  const team = req.query.team;
  // console.log(team)
  connection.query("SELECT playername FROM player WHERE team = ?",[team],
   function (err, results) {
      if (err) throw err;
      res.send(results);
  })
});

app.listen(5001, () => {
  console.log("Server is running on port 5001.");
});


