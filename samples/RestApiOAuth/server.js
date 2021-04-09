const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');
const cookieSession = require('cookie-session');
const chalk = require('chalk');
const config = require('./config');
var path = require('path');

const app = express();
const PORT = process.env.port || 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(cookieSession({ maxAge: 60 * 1000, keys: ['1234'] }));
app.use(passport.initialize());
app.use(passport.session());

// Strategy configurations
passport.use(new GoogleStrategy({
    clientID : config.oauthConfig.Google.clientID, 
    clientSecret : config.oauthConfig.Google.clientSecret,
    callbackURL : 'http://localhost:3000/auth/google/callback'}, (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    } ));

passport.use(new FacebookStrategy({
    clientID : config.oauthConfig.Facebook.appID, 
    clientSecret : config.oauthConfig.Facebook.appSecret,
    callbackURL : 'http://localhost:3000/auth/facebook/callback'}, (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    } ));

passport.use(new TwitterStrategy({
    consumerKey : config.oauthConfig.Twitter.consumerKey, 
    consumerSecret : config.oauthConfig.Twitter.consumerSecret,
    callbackURL : 'http://localhost:3000/auth/twitter/callback'}, (accessToken, refreshToken, profile, done) => {
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

/**
 * Checks for user authentication
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isUserAuthenticated(req, res, next){
    if(req.user){
        next();
    }else{
        res.send('You must login!');
    }

}

var route = require('./api/route/note');
route(app);

/* Routes for demo */
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/failure', (req, res) => {
    res.send('Authenticating using your Google account failed');
});

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/secret',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/facebook/failure', (req, res) => {
    res.send('Authenticating using your Facebook account failed');
});

app.get( '/auth/facebook/callback',
    passport.authenticate( 'facebook', {
        successRedirect: '/secret',
        failureRedirect: '/auth/facebook/failure'
}));

app.get('/auth/twitter',
  passport.authenticate('twitter', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/facebook/failure', (req, res) => {
    res.send('Authenticating using your Facebook account failed');
});

app.get( '/auth/twitter/callback',
    passport.authenticate( 'twitter', {
        successRedirect: '/secret',
        failureRedirect: '/auth/twitter/failure'
}));

app.get('/secret', isUserAuthenticated ,(req, res) => {
    res.send('You are now accessing privileged resource');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(PORT);
console.log("App started on port ", PORT);
console.log(chalk.bold.green("I am Waiting for requests.."));