//server

const express = require('express');
const bodyParser = require('body-parser'); 
 
const app = express(); 


//const hbs = require('hbs');
//const path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//app.set('/views',path.join(__dirname,'views'))
//app.set('view engine', 'hbs');
//app.use('/assets',express.static(__dirname +'/public'));


//Connecting to mongo server using restful api
const dbConnect = require("./config/connection.js");
const mongoose = require("mongoose");

//connecting to db
mongoose.Promise=global.Promise;
mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});
require('./app/routes/users.routes.js')(app);



app.get('/', (req, res) => {   
    res.json({"message": "This the users in the database"})
   }); 



// listen for requests on port 3000 
app.listen(3000, () => {
    console.log("Server listening on port 3000");
    });