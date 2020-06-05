var createError = require('http-errors');
// Web framework
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
// Templating engine requirement
var layouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var departmentsRouter = require('./routes/departments');

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
app.use(express.static(path.join(__dirname, 'public')));

/*
Middleware to print requests
app.use((req, res, next)=>{
    console.log(`Request made to URL - ${req.url}`);
    next();
});
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/departments', departmentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
