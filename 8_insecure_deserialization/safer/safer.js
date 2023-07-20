const express = require('express');
const yaml = require('js-yaml');
const bodyParser = require('body-parser');
const e = require('express');

const app = express();
const port = 3000;

app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/process-yaml', (req, res) => {
  try {
    const x = req.body;
    const result = yaml.load(x);

    console.log(x)

    // You can do whatever processing you need with the YAML data here.
    // For now, let's just send the result back to the client as a JSON response.
    res.json({ result });
  } catch (error) {
    // Handle any potential errors while parsing the YAML
    res.status(500).json({ error: 'Error processing YAML data' });
    console.log(error)
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
