/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//import { db } from './connect';

const passwordUtil = require('../../config/password');

/*var users = [
 {id: 1, username: 'bob', password: 'secret', email: 'bob@example.com'}
 , {id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com'}
 , {id: 3, username: 'aryastark@gmail.com', password: 'password', email: 'aryastark@gmail.com'}
 ];*/

const users = {
    josh: {
        salt: 'G81lJERghovMoUX5+RoasvwT7evsK1QTL33jc5pjG0w=',
        password: 'DAq+sDiEbIR0fHnbzgKQCOJ9siV5CL6FmXKAI6mX7UY=',
        work: 5000,
        displayName: 'Josh',
        id: 'josh',
        provider: 'local',
        username: 'josh'
    }
};

/*
 exports.findById = function (id, fn) {
 var idx = id - 1;
 if (users[idx]) {
 fn(null, users[idx]);
 } else {
 fn(new Error('User ' + id + ' does not exist'));
 }
 };*/

exports.findById = function (id, cb) {

    if (users[id]) {
        cb(null, users[id]);
    } else {
        cb(new Error('User : ' + id + ' does not exist'));
    }
};

/*
 exports.findByUsername = function (username, fn) {
 for (var i = 0, len = users.length; i < len; i++) {
 var user = users[i];
 if (user.username === username) {
 return fn(null, user);
 }
 }
 return fn(null, null);
 };
 */

exports.findByUsername = function (username, cb) {
    if (users[username]) {
        cb(null, users[username]);
    } else {
        cb(new Error('User : ' + username + ' does not exist'));
    }
};

exports.addUser = function (username, password, work, cb) {
    if (users[username] === undefined) {
        passwordUtil.passwordCreate(password, function (err, salt, password) {
            users[username] = {
                salt: salt,
                password: password,
                work: work,
                displayName: username,
                id: username,
                provider: 'local',
                username: username
            };
            return cb(null, users[username]);
        });
    } else {
        return cb({errorCode: 1, message: 'User exists!'}, 'User exists!', null);
    }
};

exports.addUser = function (firstName, lastName, userName, password, work, cb) {
    if (users[userName] === undefined) {
        passwordUtil.encryptPassword(password, function (err, salt, password) {
            if (err) {
                return cb({errorCode: 500, message: 'Something went wrong, retry'}, 'Something went wrong, retry', null);
            }
            users[userName] = {
                salt: salt,
                password: password,
                work: work,
                firstName: firstName,
                lastName: lastName,
                displayName: userName,
                id: userName,
                provider: 'local',
                username: userName
            };
            
            return cb(null, users[userName]);
        });
    } else {
        console.log("User exists");
        return cb({errorCode: 1, message: 'User exists!'}, 'User exists!', null);
    }
};

exports.updatePassword = function (username, password, work) {
    passwordUtil.encryptPassword(password, function (err, salt, password) {
        users[username].salt = salt;
        users[username].password = password;
        users[username].work = work;
    });
};