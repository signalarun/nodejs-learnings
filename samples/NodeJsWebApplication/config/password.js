/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var crypto = require('crypto');
var scmp = require('scmp');

var encryptPassword = function passwordCreate(password, cb){
  crypto.randomBytes(process.env.CRYPTO_RANDOMSIZE, function(err, salt){
    if (err)
      return cb(err, null);
        crypto.pbkdf2(password, salt.toString('base64'), process.env.CRYPTO_WORKFACTOR, process.env.CRYPTO_KEYLEN, function(err, key){
            cb(null, salt.toString('base64'), key.toString('base64'));
        });
    });
};

var validatePassword = function passwordCheck(password, derivedPassword, salt, work, cb){
    crypto.pbkdf2(password, salt, work, process.env.CRYPTO_KEYLEN, function(err, key){
        cb(null, scmp(key.toString('base64'), derivedPassword));
    });
};

exports.encryptPassword = encryptPassword;
exports.validatePassword = validatePassword; 