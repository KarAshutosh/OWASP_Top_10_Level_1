// unsafe.js
// Vulnerable to SQL Injection

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'StrongestPassword#1',
  database: 'loginlist',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});

// Parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the login form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Process the login form
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Construct the SQL query (unsafe)
    const query = `SELECT * FROM login_credentials WHERE username = '${username}' AND password = '${password}'`;

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }

        if (results.length === 1) {
            res.send('Login successful');
        } else {
            res.send('Invalid username or password');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
