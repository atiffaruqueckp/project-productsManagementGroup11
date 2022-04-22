//importing part

const express = require('express'); //it is a free and open source web application framework for node.js.manage a wep application.
const bodyParser = require('body-parser');       // this is a Node.js middleware for handling data of req, res 
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();                                            //create a object(app) from  express and we call a express.
const multer = require('multer'); //multer is a node.js middleware for handling multipart form data  which is used for uploading a files.

// middleware set up

app.use(bodyParser.json());                                     // data handle for json format
app.use(bodyParser.urlencoded({ extended: true }));        // it is use for insert or post a data and return an object value.
app.use(multer().any())    // .any means its uploads a different types of file ,get those file in request.files

//connecting with monodb database

mongoose.connect("mongodb+srv://taabish:lkmgsyjhwbQYgkvX@cluster0.cp3ka.mongodb.net/atif1234?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

//for starting a server

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});