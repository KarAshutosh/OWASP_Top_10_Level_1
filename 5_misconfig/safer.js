const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const {sanitizeAndValidateInput} = require('./safe_input_v2')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});



// Apply rate limiting
var loginAttempts = [];

function addLoginAttempt(username, status) {
  loginAttempts.push({ username: username, status: status });
}

function failedAttempts(username){

  var failedAttempts = loginAttempts.filter(function(attempt) {
    return attempt.username === username && attempt.status === 'failure';
  });

  var failed_attempts = failedAttempts.length;
  
  if (failed_attempts > 3){return false}
  else {return true}

}

// Apply input validation, sanitization and rate limit

app.post('/login', (req, res) => {
  
  // Remove potentially malicious characters
  const username = sanitizeAndValidateInput(req.body.username);
  const password = sanitizeAndValidateInput(req.body.password);

  check = failedAttempts(username)

  if (check == true){
    // Simulating validation and sanitization in authentication logic
    if (username === 'admin' && password === 'veryStrongPassword') {
      res.sendFile(path.join(__dirname, 'admin.html'));
    } else {
      addLoginAttempt(username, 'failure');
      res.sendFile(path.join(__dirname, 'error.html'));
    }
  }
  else{
    res.send(`Too many attempts on ${username}`)
  }
  
});

// Apply secure headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// No error information sent
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
