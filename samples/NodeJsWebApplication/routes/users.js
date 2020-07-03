var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/v1/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/v1/abouts', function (req, res, next) {
  res.send('About this user');
});

module.exports = router;
