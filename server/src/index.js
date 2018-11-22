const express = require('express');
//var session = require('express-session');

//var MongoStore = require('connect-mongo')(session);

const bodyParser= require('body-parser');
const cors= require('cors');
const morgan = require('morgan');
const config= require('./config/config');
const mongoose=require('mongoose');
const {user,auth, service}= require('./routes/index.js');
const errorHandler = require('./_helpers/error-handler');
const jwt = require('./_helpers/jwt');

mongoose.Promise=global.Promise;

const app= express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(user);
app.use(auth);
app.use(service);

app.use(errorHandler);
app.use(jwt());





//start server
mongoose.connect(config.dbURL, config.dbOptions);
//var db = mongoose.connection;
//
//app.use(session({
//  secret: 'work hard',
//  resave: true,
//  saveUninitialized: false,
//  store: new MongoStore({
//    mongooseConnection: db
//  })
//}));

mongoose.connection
    .once('open',()=>{
        console.log(`mongoose - successful connection ...`)
        app.listen(process.env.PORT || config.port,
           ()=> console.log(`Server start on port ${config.port} ...`))
    })
    .on('error', error=> console.warn(error))

