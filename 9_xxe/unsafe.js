// Risks: sensitive information disclosure, server-side request forgery (SSRF), and remote code execution

const express = require('express');
const libxmljs = require('libxmljs');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to parse incoming XML data
app.use(bodyParser.text({ type: 'application/xml' }));

// Serve the front-end HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/parse-xml', (req, res) => {
    if (!req.body) {
        return res.status(400).send('No XML data submitted.');
    }

    const xmlString = req.body;

    try {
        const xmlDoc = libxmljs.parseXml(xmlString, { noent: true, noblanks: true });

        // Further processing of the XML document
        console.log('Products XML Document:', xmlDoc.toString());

        // XML successfully parsed
        res.send('Products successfully sent: ' + xmlDoc.toString());
    } catch (error) {
        console.error('Error occurred while parsing XML:', error);
        res.status(500).send('Error occurred while parsing XML.');
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});