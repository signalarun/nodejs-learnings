const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.port || 3000;

app.listen(PORT);

app.use(cookieSession({ maxAge: 60 * 1000, keys: ['1234'] }));
app.use(passport.initialize());
app.use(passport.session());

var route = require('./api/route/note');
route(app);

console.log("App started on port ", PORT);