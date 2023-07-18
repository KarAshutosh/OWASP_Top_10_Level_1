// Node.js Backend

const express = require('express');
const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));

// Endpoint to render the HTML form
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Safe Page</title>
    </head>
    <body>
      <h1>Welcome to the Safe Page</h1>
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
app.post('/post', (req, res) => {
  const message = sanitizeHTML(req.body.message); // Sanitize user input
  res.send(`
    <html>
    <head>
      <title>Safe Page</title>
    </head>
    <body>
      <h1>Safe Page</h1>
      <p>Your message: ${message}</p>
    </body>
    </html>
  `);
});

// Sanitize HTML helper function
function sanitizeHTML(input) {
  // Replace special characters with HTML entities
  return input.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#x27;')
              .replace(/\//g, '&#x2F;');
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
