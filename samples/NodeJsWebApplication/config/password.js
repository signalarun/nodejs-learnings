/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var crypto = require('crypto');
var scmp = require('scmp');

/**
 * The function first uses randomBytes that will return 256 random bytes of data.
 * Then take that as salt and the clear text password and send it to Password-Based Key Derivation Function 2 (PBKDF2), 
 * which is a function that will create a derived key based on salt, our password, and a work factor. 
 * We then return salt and the derived key back so that we can persist it.
 */
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