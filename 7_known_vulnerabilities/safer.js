const express = require('express')
const app = express()
 
app.set('views', __dirname);
app.set('view engine', 'squirrelly')
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {

    try{
        
        userID = req.query.userID

        if(userID != undefined) {
            res.render('index.squirrelly', {user: userID})
        } else {
            res.send("Enter url in the browser as http://127.0.0.1:3000/?userID=yourName")
        }

    }
    catch(e){
        console.log(e)
        res.send("Something went wrong")
    }
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

module.exports = app;
