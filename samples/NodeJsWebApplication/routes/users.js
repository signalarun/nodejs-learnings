var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/abouts', function (req, res, next) {
  res.send('About this user');
});

module.exports = router;
