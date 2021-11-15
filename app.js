require('dotenv').config({path: '.env'})

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const middlewares = require('./middlewares/errors')

const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.text({limit: '10mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(session({
    secret: 'template',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge:60000
    }
}))

app.use(flash());

app.use('/', routes);

app.use(middlewares.notFound)
app.use(middlewares.catchErrors)

module.exports = app;


