const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/somehacking', (req, res) => {
    res.send(`
        <h1>Sensitive Information</h1>
        <p>This blog will make your applications much safer</p>
    `);
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
