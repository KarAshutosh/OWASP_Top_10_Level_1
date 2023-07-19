const express = require('express')
const app = express()
const port = 3000
 
app.set('views', __dirname);
app.set('view engine', 'squirrelly')
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {

   if(req.query != undefined) {
      res.render('index.squirrelly', req.query)
   } else {
      res.send("Enter url in the browser as http://127.0.0.1:3000/?userID=yourName")
   }

})
 
app.listen(3000, () => {
   console.log('Server listening on port 3000');
});

module.exports = app;
