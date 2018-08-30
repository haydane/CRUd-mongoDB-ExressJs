const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database');
const mongoose = require('mongoose');
const handleBars = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
var app = express();


mongoose.connect(dbConfig.url, { useNewUrlParser: true });
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());

app.use(session({
     secret: 'secret',
     saveUninitialized: true,
     resave: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css/')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', handleBars({
     defaultLayout: 'index'
}));

app.use((req, res, next) => {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     next();
});

const userRout = require('./routes/userRout');
app.use('/', userRout);

const port = 3000;
app.listen(port, () => console.log(`app is listening to port ${port}`));