const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); // Make sure bcrypt is installed
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Establish a database connection
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    }
});

// POST endpoint for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            return res.status(500).send('Error querying the database.');
        }
        if (row) {
            // Compare the hashed password
            bcrypt.compare(password, row.password, (err, match) => {
                if (err) {
                    return res.status(500).send('Error comparing passwords.');
                }
                if (match) {
                    res.send('Login successful');
                } else {
                    res.status(401).send('Login failed');
                }
            });
        } else {
            res.status(401).send('Login failed');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
