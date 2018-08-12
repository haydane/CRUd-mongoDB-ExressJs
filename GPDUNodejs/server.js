const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database');
const mongoose = require('mongoose');
const handleBars = require('express-handlebars');
var userModel = require('./model/userModel');
let userController = require('./controllers/userController');
const path = require('path');
var app = express();

mongoose.connect(dbConfig.url, {useNewUrlParser: true});
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
app.engine('handlebars',handleBars({
     defaultLayout: 'index'
}));

const userRout = require('./routes/userRout')
app.use('/',userRout);

const port = 3000;
app.listen(port,() => console.log(`app is listening to port ${port}`));