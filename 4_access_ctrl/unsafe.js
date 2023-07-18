const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: false,
}));

// Array to store user data
const users = [{ id: '1', username: 'user1', password: 'password1' }, { id: '2', username: 'user2', password: 'password2' }];

// Array to store blog posts
const blogPosts = [
    {id:'1', userId:'1', title:'Did You Know I have a newsletter?', content:'You should totally go to abc.com and signup'},
    {id:'2', userId:'1', title:'You can get the best cybersecurity related content', content:'It is free so you can always unsubscribe'},
    {id:'3', userId:'2', title:'Okay, we should move on to hacking', content:'It takes a lot of effort so please share it'}
];

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

    // Insecure authentication logic (just for demonstration)
    if (username === 'user1' && password === 'password1' || username === 'user2' && password === 'password2') {
        const user = users.find((user) => user.username === username && user.password === password);
        req.session.userId = user.id
        req.session.authenticated = true;
        res.redirect('/');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/blogs', (req, res) => {
    const titles = blogPosts.map(post => ({
        id: post.id,
        title: post.title
    }));
  
    const links = titles.map(title => `<a href="/blog/${title.id}">${title.title}</a>`);
  
    res.send(links.join('<br>'));
});

app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    const blogPost = blogPosts.find(post => post.id === id);
  
    if (!blogPost) {
        return res.status(404).send('Blog post not found!');
    }
  
    const { title, content } = blogPost;
    res.send(`<h1>${title}</h1><p>${content}</p>`);
});


app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const index = blogPosts.findIndex(post => post.id === id);
  
    if (index === -1) {
      return res.status(404).send('Blog post not found!');
    }
  
    blogPosts.splice(index, 1);
    res.send('Blog post deleted successfully!');
});

app.get('/deleteblog', (req, res) => {
    const userId = req.session.userId; // Extract userId from query parameter
  
    // Filter blog posts based on userId
    const filteredPosts = blogPosts.filter(post => post.userId === userId);
  
    // Extract titles from filtered blog posts
    const titles = filteredPosts.map(post => ({
      id: post.id,
      title: post.title
    }));
    
    // Create links for the filtered titles
    const links = titles.map(title => `<a href="/delete/${title.id}">${title.title}</a>`);
  
    res.send(links.join('<br>'));
});
  

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
