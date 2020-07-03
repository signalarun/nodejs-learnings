/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var indexRouter = require('./index');
var usersRouter = require('./users');
var departmentsRouter = require('./departments');
var authenticationRouter = require('./authentication');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/departments', departmentsRouter);
app.use('/account/authentication', authenticationRouter);

module.exports = app;