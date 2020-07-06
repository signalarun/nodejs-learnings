/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/v1/name', require('connect-ensure-login').ensureLoggedIn('/api/account/authentication/v1/login'), function(req, res, next) {
  res.send('Name of department'); 
});

router.get('/v1/about', function (req, res, next) {
  res.send('About this department');
});

// Passing parameters
router.get('/v1/reflect/:data', function (req, res, next) {
  let data = req.params.data;
  res.send(`Reflected value is - ${data}`);
});


module.exports = router;