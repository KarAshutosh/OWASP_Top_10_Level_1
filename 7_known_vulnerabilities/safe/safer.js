const express = require('express')
const app = express()
const port = 3000
 
app.set('views', __dirname);
app.set('view engine', 'squirrelly')
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
   res.render('index.squirrelly', req.query)
})
 
app.listen(port, () => {})
module.exports = app;
