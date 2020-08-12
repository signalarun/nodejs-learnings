/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const user = require('../app/controller/user');
var express = require('express');
var passport = require('passport');
var router = express.Router();

/*
 * TODO Register
 * TODO Login
 * TODO Logout
 */
// Serves login page
router.get('/v1/login', function (req, res, next) {
  res.render('login', { title: 'Login', messages: req.flash('message')}); // authentication failure messsage
});

// Handles login request
router.post('/v1/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/api/account/authentication/v1/login',
                                   failureFlash: true })
);

router.get('/v1/logout', function (req, res, next) {
  req.logOut();
  res.redirect('/api/account/authentication/v1/login');
});

router.post('/v1/register', user.validate('addUser'), function (req, res, next) {
  if(req.user){
       res.redirect('/');
  }else{
    user.addUser(req, res, next);//(username, password, work, cb)    
  } 
  
});

/**
 * Gets registeration page
 */
router.get('/v1/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

module.exports = router;