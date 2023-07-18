const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Misconfiguration 1: No explicit trust boundaries defined
app.use(bodyParser.urlencoded({ extended: false }));

// Misconfiguration 2: Directory traversal vulnerability
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Misconfiguration 3: Lack of input validation and sanitization and rate limit
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username)
  console.log(password)

  // Simulating authentication logic
  if (username == 'admin' && password == 'defaultPassword') {
    res.sendFile(path.join(__dirname, 'admin.html'));
  } else {
    res.sendFile(path.join(__dirname, 'error.html'));
  }
});

// Misconfiguration 4: Lack of secure headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '0');
  next();
});

app.use((err, req, res, next) => {
  console.error();
  res.send(err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
