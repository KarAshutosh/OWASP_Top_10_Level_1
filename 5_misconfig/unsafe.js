const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Lack of input validation and sanitization and rate limit
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username)
  console.log(password)

  // Default Passwords
  if (username == 'admin' && password == 'defaultPassword') {
    res.sendFile(path.join(__dirname, 'admin.html'));
  } else {
    res.sendFile(path.join(__dirname, 'error.html'));
  }
});

// Lack of secure headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '0');
  next();
});

// Improper error handelling 
app.use((err, req, res, next) => {
  console.error();
  res.send(err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
