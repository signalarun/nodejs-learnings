/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
  res.render('login', { title: 'Express' });
});

// Handles login request
router.post('/v1/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/api/account/authentication/v1/login',
                                   failureFlash: true })
);

router.get('/v1/logout', function (req, res, next) {
  res.send('About this user');
});

module.exports = router;