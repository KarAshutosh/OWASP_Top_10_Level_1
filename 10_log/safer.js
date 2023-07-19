const express = require('express');
const app = express();
const fs = require('fs');

// Logging function
function logRequest(req) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile('access.log', log, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

// Middleware to log requests
app.use((req, res, next) => {
  logRequest(req);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/somehacking', (req, res) => {
  res.send(`
    <h1>Sensitive Information</h1>
    <p>This blog will make your applications much safer</p>
  `);
})

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
