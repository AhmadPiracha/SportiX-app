const express = require("express");
const mysql = require("mysql2");
const app = express();

const cors = require("cors");
const os = require('os');

const bodyParser = require("body-parser");
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());


// Create connection to database

const connection = mysql.createConnection({
    host: "localhost",
    database: "sportix",
    user: "root",
    password: "password",
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
    const type = req.query.type || null;
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
    const type = req.query.type || null;
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


app.post('/equipment_booking', (req, res) => {
    const Type = req.body.type;
    const Name = req.body.name;
    const Count = req.body.count;
    const timeSlotDuration = req.body.timeSlotDuration;
    const userRollNo = req.body.userRollNo;
    const displayName = req.body.displayName;
    const status = 'pending';
    const booking_date = req.body.booking_date;

    const insertSql = "INSERT INTO sportix.equip_booking (type, name, count, timeSlotDuration, userRollNo, displayName, status, booking_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const insertValues = [Type, Name, Count, timeSlotDuration, userRollNo, displayName, status, booking_date];

    // Execute the INSERT query to insert booking data
    connection.query(insertSql, insertValues, (insertErr) => {
        if (insertErr) {
            console.error("Error executing INSERT SQL query:", insertErr);
            return res.status(500).json({ message: "Error inserting data" });
        }

        // status and conditionally decrement the count in the products table
        if (status === 'confirmed') {
            const updateSql = "UPDATE sportix.product SET count = count - ? WHERE name = ?";
            const updateValues = [Count, Name];

            connection.query(updateSql, updateValues, (updateErr) => {
                if (updateErr) {
                    console.error("Error executing UPDATE SQL query:", updateErr);
                    return res.status(500).json({ message: "Error updating product count" });
                }

                res.status(200).json({ message: "Booking data inserted and product count updated successfully" });
            });
        } else {
            res.status(200).json({ message: "Booking data inserted successfully" });
        }
    });
});


app.get('/getVenue', (req, res) => {
    const type = req.query.type || null;
    let sql = "SELECT * FROM sportix.venue";

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

app.post('/venue_booking', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const location = req.body.location;
    const timeSlotDuration = req.body.timeSlotDuration;
    const userRollNo = req.body.userRollNo;
    const displayName = req.body.displayName;
    const status = 'pending';
    const booking_date = req.body.booking_date;

    const sql = "INSERT INTO venue_booking (name, type, location, timeSlotDuration, userRollNo, displayName, status, booking_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [name, type, location, timeSlotDuration, userRollNo, displayName, status, booking_date]; // Include booking_date in the values array

    connection.query(sql, values, (err) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Error inserting data" });
        }
        res.status(200).json({ message: "Booking data inserted successfully" });
    });
});


app.get('/viewEquipBookings', (req, res) => {
    const userRollNo = req.query.userRollNo || null;
    let sql = "SELECT * FROM sportix.equip_booking";

    if (userRollNo) {
        sql += " WHERE userRollNo = ?";
    }

    connection.query(sql, [userRollNo], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching data");
        }

        res.send(result);
    });

});

app.get('/viewVenueBookings', (req, res) => {
    const userRollNo = req.query.userRollNo || null;
    let sql = "SELECT * FROM sportix.venue_booking";

    if (userRollNo) {
        sql += " WHERE userRollNo = ?";
    }

    connection.query(sql, [userRollNo], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching data");
        }

        res.send(result);
    });

});

app.get('/getLeague', (req, res) => {
    const name = "SELECT DISTINCT nname,ground_name FROM sportix.league";

    connection.query(name, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching data");
        }

        res.send(result);

    });

});

app.get('/getLeagueTeams', (req, res) => {
    const LeagueName = req.query.League_Name || null;
    const sql = "SELECT name FROM sportix.leagueteams WHERE League_Name = ?";
    connection.query(sql, [LeagueName], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Error fetching data" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "No data found for the specified League_Name" });
        }

        res.json(result);
    });
});

app.get('/getLeagueSchedule', (req, res) => {
    const LeagueName = req.query.League_Name || null;
    const sql = "SELECT * FROM sportix.matches WHERE League_Name = ?";
    connection.query(sql, [LeagueName], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Error fetching data" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "No data found for the specified League_Name" });
        }

        res.json(result);
    });
});


app.listen(5001, () => {
    console.log("Server is running on port 5001.");
});