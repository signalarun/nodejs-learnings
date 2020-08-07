/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//import { db } from './connect';

const passwordUtil = require('../../config/passport');

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
  , { id: 3, username: 'aryastark@gmail.com', password: 'password', email: 'aryastark@gmail.com' }
];

/*
const dUsers = {
    josh :{
        salt: 'G81lJERghovMoUX5+RoasvwT7evsK1QTL33jc5pjG0w=',
        password: 'DAq+sDiEbIR0fHnbzgKQCOJ9siV5CL6FmXKAI6mX7UY=',
        work: 5000,
        displayName: 'Josh',
        id: 'josh',
        provider: 'local',
        username: 'josh'    
    }
};*/

exports.findById = function(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
};

exports.findByUsername = function(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};

exports.addUser = function(username, password, work, cb){
    // TODO addUser
};

exports.updatePassword = function(username, password){
    // TODO updatePassword
};