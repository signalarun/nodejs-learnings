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
var encryptPassword = function(password, cb){
  crypto.randomBytes(Number(process.env.CRYPTO_RANDOMSIZE), function(err, salt){
    if (err)
      return cb(err, null);
        crypto.pbkdf2(password, salt.toString('base64'), Number(process.env.CRYPTO_WORKFACTOR), Number(process.env.CRYPTO_KEYLEN), 'sha1',function(err, key){
            cb(null, salt.toString('base64'), key.toString('base64'));
        });
    });
};

var validatePassword = function(password, derivedPassword, salt, work, cb){
    
    crypto.pbkdf2(password, salt, work, Number(process.env.CRYPTO_KEYLEN), 'sha1', function(err, key){
        
        const keyBuff      = Buffer.from(key.toString('base64'), 'hex');
        const derivedPasswordBuff = Buffer.from(derivedPassword, 'hex');
        console.log(key, " " + keyBuff + " "+derivedPassword);
        cb(null, scmp(keyBuff, derivedPasswordBuff));
    });
};

exports.encryptPassword = encryptPassword;
exports.validatePassword = validatePassword; 