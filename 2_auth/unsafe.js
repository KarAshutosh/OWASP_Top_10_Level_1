// unsafe.js (Node.js)

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secretpassword', resave: true, saveUninitialized: true }));

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.authenticated) {
        return next();
    }
    res.redirect('/login');
};

app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Insecure authentication logic
    if (username === 'admin' && password === 'password') {
        req.session.authenticated = true;
        res.redirect('/');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/logout', (req, res) => {
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
