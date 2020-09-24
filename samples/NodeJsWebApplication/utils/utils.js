/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var crypto = require('crypto');

/**
 * The more random bytes you use in a token, the less likely it can be hacked. 
 * Uses 64 random bytes.
 * @returns {token}
 */
exports.generateRandomToken = function(){
    return crypto.randomBytes(64).toString('base64');
};
        
        