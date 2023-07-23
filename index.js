// require library and configure the port
const express = require('express');
const env = require('./config/environment');
const morgan = require('morgan'); // for logging
var cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
require('./config/view-helper')(app);
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport =require('passport');
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');



app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayout);

// set path for upload - Avatar
app.use('/uploads', express.static(__dirname + '/uploads'));

// extract style and script from sub pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting the view engine to ejs(Similar to django jinja template)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// using mongo store to store session cookies in db
app.use(session({
    name: 'placementCell',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://salmaan194:Bk5paMbsSI8Falck@cluster0.ocpab4h.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// set flash
app.use(flash());
app.use(customMiddleware.setFlash);

// use the router
app.use('/', require('./routes'));




app.listen(port, function(err){
   if(err){
       console.log(`Error: ${err}`);
   }
   console.log(`Server is running on port : ${port}`);
})

