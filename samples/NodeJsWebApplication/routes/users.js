var express = require('express');
var router = express.Router();

const user = require('../app/controller/user');

/* GET users listing. */
router.get('/v1/users', function(req, res, next) {
  user.listUsers(req, res, next);
});

router.get('/v1/abouts', function (req, res, next) {
  res.send('About this user');
});

/* GET profile page. */
router.get('/v1/profile', require('connect-ensure-login').ensureLoggedIn('/api/account/authentication/v1/login'), function(req, res, next) {
  
    let u = user.getUserProfile(req, res, next);
    u.then(function(result){
        res.render('profile', { title: 'Profile', name : result.firstName + ' ' + result.lastName, userName : result.username, displayName : result.displayName});
    });
    
});

module.exports = router;
