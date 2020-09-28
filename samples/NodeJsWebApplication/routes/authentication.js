/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const user = require('../app/controller/user');
const forgotPassword  = require('../app/controller/forgot-password');
const resetPassword  = require('../app/controller/reset-password');
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
                                       // TODO reply without redirect or redirect showing cause of error
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

/**
 * Gets forgot password page
 */
router.get('/v1/forgot-password', function (req, res, next) {
  res.render('forgot-password', { title: 'Forgor Password' });
});

/**
 * Sends reset pasword link to users registered email
 */
router.post('/v1/forgot-password', forgotPassword.validate('generatePasswordResetLink'), function(req, res, next) {
    forgotPassword.generateResetPasswordLink(req, res, next);    
});

router.get('/v1/reset-password', function(req, res, next) {
    resetPassword.generatePasswordResetForm(req, res, next);
});

router.post('/v1/reset-password', resetPassword.validate('resetPassword'), function(req, res, next) {
    resetPassword.resetPassword(req, res, next);
});


module.exports = router;