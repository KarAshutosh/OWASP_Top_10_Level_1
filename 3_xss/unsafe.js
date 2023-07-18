// Node.js Backend

const express = require('express');
const app = express();

// Endpoint to render the HTML form
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Unsafe Page</title>
    </head>
    <body>
      <h1>Welcome to the Unsafe Page</h1>
      <form action="/post" method="post">
        <label for="message">Enter your message:</label>
        <input type="text" name="message" id="message" />
        <input type="submit" value="Submit" />
      </form>
    </body>
    </html>
  `);
});

// Endpoint to process the submitted form data
app.post('/post', express.urlencoded({ extended: false }), (req, res) => {
  const message = req.body.message;
  res.send(`
    <html>
    <head>
      <title>Unsafe Page</title>
    </head>
    <body>
      <h1>Unsafe Page</h1>
      <p>Your message: ${message}</p>
    </body>
    </html>
  `);
});
  

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
