//app.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const song = require('./routes/song.route'); // Imports routes for the products
const user = require('./routes/user.route'); // Imports routes for the products
const review = require('./routes/review.route'); // Imports routes for the products
const policy = require('./routes/policy.route'); // Imports routes for the products
const downpolicy = require('./routes/downpolicy.route'); // Imports routes for the products

const filter = require('content-filter')


exports.sanitize = function(html){
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

const app = express();

const corsOptions = {
    origin: true,
    credentials: true
  }
app.use(cors({
  origin: '*'
}))
app.options('*', cors(corsOptions));

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = process.env.dev_db_url;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(filter());
//body parser
app.use(bodyParser.json()); //parses requests
app.use(bodyParser.urlencoded({extended: false}));//parses requests

//test push

app.use('/api', song);
//test push
app.use('/api', user);
//test push
app.use('/api', review);

app.use('/api', policy);

app.use('/api', downpolicy);




app.listen(process.env.PORTNUM, () => {
    console.log('Server is up and running on port numner ' + process.env.PORTNUM);
    console.log(process.env.JWT_KEY)

});
