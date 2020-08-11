/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mUser = require('../model/user');

exports.findById = function(id, fn) {
    mUser.findById(id, fn);
};

exports.findByUsername = function(username, fn) {
  mUser.findByUsername(username, fn);  
};

exports.addUser = function (username, password, work, cb){
    mUser.addUser(username, password, work, cb);
};