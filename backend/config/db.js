const express = require("express");
const mysql = require("mysql2");
const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
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

app.get('/getSportsType', (req, res) => {
    const sql = "SELECT DISTINCT type FROM sportix.product";
    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching data");
        }

        res.send(result);
    });
});

app.get('/getProducts', (req, res) => {
    const type = req.query.type || null; // No default type
    let sql = "SELECT * FROM sportix.product";

    if (type) {
        sql += " WHERE type = ?";
    }

    connection.query(sql, [type], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching data");
        }

        res.send(result);
    });

});

app.post('/booking', (req, res) => {
    const Type = req.body.type;
    const Name = req.body.name;
    const Count = req.body.count;
    const date = req.body.date;
    const timeSlotDuration = req.body.timeSlotDuration; // Add time slot duration
    const userEmail = req.body.userEmail;
    const displayName = req.body.displayName;

    const sql = "INSERT INTO bookings (type, name, count, date, timeSlotDuration, userEmail, displayName) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [Type, Name, Count, date, timeSlotDuration, userEmail, displayName];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Error inserting data" });
        }

        // console.log("Query result:", result);

        res.status(200).json({ message: "Booking data inserted successfully" });
    });
});





app.listen(5001, () => {
    console.log("Server is running on port 5001.");
});