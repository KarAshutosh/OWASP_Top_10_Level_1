const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/attack.html');
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});

