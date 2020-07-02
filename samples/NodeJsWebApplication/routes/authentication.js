/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();

/*
 * TODO Register
 * TODO Login
 * TODO Logout
 */

router.get('/login', function (req, res, next) {
  res.send('About this user');
});


router.get('/logout', function (req, res, next) {
  res.send('About this user');
});

module.exports = router;