const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const chalk = require('chalk');
const config = require('./config');

const app = express();
const PORT = process.env.port || 3000;

app.listen(PORT);

app.use(cookieSession({ maxAge: 60 * 1000, keys: ['1234'] }));
app.use(passport.initialize());
app.use(passport.session());

// Strategy configurations
passport.use(new GoogleStrategy({clientID : config.oauthConfig.Google.clientId, 
    clientSecret : config.oauthConfig.Google.clientSecret,
    callbackURL : 'http://localhost:3000/auth/google/callback'}, (accessToken, refresstoken, profile, done) => {
        done(null, profile);
    } ));

// Used to add a pieceof information into cookie    
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the recieved cookie and persist the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

var route = require('./api/route/note');
route(app);

console.log("App started on port ", PORT);
console.log(chalk.bold.green("I am Waiting for requests.."));