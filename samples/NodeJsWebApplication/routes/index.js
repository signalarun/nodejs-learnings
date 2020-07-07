var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('connect-ensure-login').ensureLoggedIn('/api/account/authentication/v1/login'), function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
