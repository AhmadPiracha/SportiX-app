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
    password: "fast@19cfd",
});
module.exports = connection;

app.get("/getTeams", function (req, res) {
    let sql = "SELECT * FROM sportix.teams WHERE type='cricket'";

    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.get("/teamSchedule", function (req, res) {
    const type = req.query.type || null;
    let sql = "SELECT * FROM sportix.teamschedule";

    if (type) {
        sql += " WHERE type = ?";
    }

    connection.query(sql, [type], function (err, results) {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching team schedules");
        }

        res.send(results);
    });
});

app.get("/getPlayers", function (req, res) {
    const team = req.query.team;
    connection.query("SELECT playername,rollno FROM sportix.player WHERE team = ?", [team],
        function (err, results) {
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

    connection.query(insertSql, insertValues, (insertErr) => {
        if (insertErr) {
            console.error("Error executing INSERT SQL query:", insertErr);
            return res.status(500).json({ message: "Error inserting data" });
        }
        else {
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
    const values = [name, type, location, timeSlotDuration, userRollNo, displayName, status, booking_date];

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

// app.post('/placeBid', async (req, res) => {
//     try {
//         const { displayName, userRollNo, team, league, basePrice, biddingAmount } = req.body;
//         const totalAmount = basePrice + biddingAmount;

//         const result =
//             'INSERT INTO league_bidding (displayName, userRollNo, team, league, basePrice, biddingAmount, totalAmount, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
//         const values =
//             [displayName, userRollNo, team, league, basePrice, biddingAmount, totalAmount];

//         connection.query(result, values, (err) => {
//             if (err) {
//                 console.error("Error executing SQL query:", err);
//                 return res.status(500).json({ message: "Error inserting data" });
//             }
//             res.status(200).json({ message: "Bid placed successfully" });
//         }
//         );
//     }
//     catch (err) {
//         console.error("Error executing SQL query:", err);
//         return res.status(500).json({ message: "Error inserting data" });
//     }
// }
// );


app.post('/placeBid', async (req, res) => {
    try {
        const { displayName, userRollNo, team, league, basePrice, biddingAmount } = req.body;
        const totalAmount = basePrice + biddingAmount;

        // Check if there are existing bids for the same team and league
        const existingBidsQuery = 'SELECT * FROM league_bidding WHERE team = ? AND league = ?';
        const existingBidsValues = [team, league];

        connection.query(existingBidsQuery, existingBidsValues, (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ message: "Error checking existing bids" });
            }

            if (result.length === 0 || totalAmount > result[0].totalAmount) {
                // The current bid is the highest or there are no existing bids, update or insert accordingly
                let query;
                let values;

                if (result.length === 0) {
                    // No existing bids, insert a new record
                    query = 'INSERT INTO league_bidding (displayName, userRollNo, team, league, basePrice, biddingAmount, totalAmount, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
                    values = [displayName, userRollNo, team, league, basePrice, biddingAmount, totalAmount];
                } else {
                    // Existing bids, update the highest bid
                    query = 'UPDATE league_bidding SET displayName = ?, userRollNo = ?, basePrice = ?, biddingAmount = ?, totalAmount = ?, createdAt = NOW() WHERE team = ? AND league = ?';
                    values = [displayName, userRollNo, basePrice, biddingAmount, totalAmount, team, league];
                }

                connection.query(query, values, (err) => {
                    if (err) {
                        console.error("Error executing SQL query:", err);
                        return res.status(500).json({ message: "Error updating or inserting bid" });
                    }

                    res.status(200).json({ success: true, message: 'Bid placed successfully' });
                });
            } else {
                // The current bid is not the highest
                res.status(200).json({ success: false, message: 'Your bid is not the highest' });
            }
        });
    } catch (err) {
        console.error("Error placing bid:", err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/viewAllBiddings', (req, res) => {
    const league = req.query.league || null;
    let sql = "SELECT * FROM sportix.league_bidding";

    if (league) {
        sql += " WHERE league = ?";
    }

    connection.query(sql, [league], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).send("Error fetching data");
        }

        res.send(result);
    });

});

app.listen(5001, () => {
    console.log("Server is running on port 5001.");
});