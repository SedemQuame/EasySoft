// jshint esversion: 8
require('dotenv').config();

//========================================= requiring modules ========================================//
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

// custom user modules
const db = require('./config/db.config');

// creating mongoose connection to db
mongoose.Promise = global.Promise;

const connectDB = async () => {
mongoose.connect(db.url, db.options);
};

connectDB().then(() => {
    console.log('DB Connected....');
}).catch(() => {
    console.log('DB Not Connected....');
});

//creating app
const app = express();

// cookie parser
app.use(cookieParser());

app.use(session({secret: 'secretKey', saveUninitialized: true, resave: true, cookie: {maxAge: 600000}}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// serving static files in express
app.use(express.static(__dirname + '/public'));


//====================================== requiring list routes ========================================//
require('./routes/user.routes')(app);
require('./routes/todo.routes')(app);

// define a simple route
app.get('/', (req, res) => {
    res.redirect(`/home`);
});

// listening port
let port = process.env.PORT || 9000;
app.listen(port, function() {
    console.log(`Elector app started on port: ${port}`);
});