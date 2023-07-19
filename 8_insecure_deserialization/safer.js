// Version 2: Not vulnerable to SQL Injection
// SQL queries are constructed using prepared statements or parameterized queries

// Dependencies
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'StrongestPassword#1',
  database: 'loginlist',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the login form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle the login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Construct the secure SQL query using placeholders
  const sql = 'SELECT * FROM login_credentials WHERE username = ? AND password = ?';

  // User inputs are treated as parameters and passed separately from the query string
  // The database system handles proper escaping and quoting of the parameters, effectively preventing SQL injection attacks.
  // The use of prepared statements ensures that user input is always treated as data, not executable SQL code.

  // Execute the SQL query with parameters
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      throw err;
    }

    // Check if the user exists
    if (result.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
