var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var createError = require('http-errors');
var flash = require('connct-flash');
// Web framework
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
// Templating engine requirement
var layouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var apiRouter   = require('./routes/api');
var cUser = require('./app/controller/user');

/* Authentication */
passport.use(new LocalStrategy(
        function (username, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // Find the user by username.  If there is no user with the given
                // username, or the password is not correct, set the user to `false` to
                // indicate failure and set a flash message.  Otherwise, return the
                // authenticated `user`.
                cUser.findByUsername(username, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {message: 'Incorrect username.'});
                    }
                    if (user.password !== password) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                    return done(null, user); //  user found valid
                });
            });
        }
));

/*
 In a typical web application, the credentials used to authenticate a user will
 only be transmitted during the login request. If authentication succeeds, 
 a session will be established and maintained via a cookie set in the user's browser.
 Each subsequent request will not contain credentials, but rather the unique cookie 
 that identifies the session. In order to support login sessions, Passport will 
 serialize and deserialize user instances to and from the session. 
 Ref. http://www.passportjs.org/docs/authenticate/
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  cUser.findById(id, function(err, user) {
    done(err, user);
  });
});  


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(layouts);

app.use(logger('dev')); // Activates loging
app.use(express.json()); // For analysing request data
app.use(express.urlencoded({ extended: false })); // For analysing request data
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'public'))); // Setting up public directories

// TODO remove if session not required
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

/*
Middleware to print requests
app.use((req, res, next)=>{
    console.log(`Request made to URL - ${req.url}`);
    next();
});
*/

app.use('/', indexRouter);
// App APIS are available here
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render("404");
  //  next(createError(404));
});

// error handler, an error handling middleware
app.use(function(err, req, res, next) {
    
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;