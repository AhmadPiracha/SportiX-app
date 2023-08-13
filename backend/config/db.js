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
    password: "fast@19cfd",
});
module.exports = connection;

app.get("/getTeams", function(req, res) {
    let sql = "SELECT * FROM sportix.teams WHERE type='cricket'";

    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.get("/teamSchedule", function(req, res) {
    const type = req.query.type || null; // No default type
    let sql = "SELECT * FROM sportix.teamschedule";

    if (type) {
        sql += " WHERE type = ?";
    }

    connection.query(sql, [type], function(err, results) {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching team schedules");
        }

        res.send(results);
    });
});



app.get("/getPlayers", function(req, res) {
    const team = req.query.team;
    connection.query("SELECT playername,rollno FROM sportix.player WHERE team = ?", [team],
        function(err, results) {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).send("Error fetching players");
            }
            res.send(results);
        });
});



app.listen(5001, () => {
    console.log("Server is running on port 5001.");
});