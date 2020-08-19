/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const passwordUtil = require('../../config/password');
let userModel = require('../model/mongodb/user');


exports.addUser = function (firstName, lastName, userName, password, work, cb) {

    userModel.exists({name: userName}, function (err, userExist) {
        if (err) {
            return cb({errorCode: 500, message: 'Something went wrong, retry'}, 'Something went wrong, retry', null);
        } else {

            if (userExist) {
                cb({errorCode: 1, message: 'User exists!'}, 'User exists!', null);
            } else {
                passwordUtil.encryptPassword(password, function (err, salt, password) {
                    if (err) {
                        return cb({errorCode: 500, message: 'Something went wrong, retry'}, 'Something went wrong, retry', null);
                    }

                    let user = new userModel({
                        salt: salt,
                        password: password,
                        work: work,
                        firstName: firstName,
                        lastName: lastName,
                        displayName: userName,
                        id: userName,
                        provider: 'local',
                        username: userName
                    });

                    user.save(function (err, result) {
                        if (err) {
                            cb({errorCode: 1, message: 'User exists!'}, 'User exists!', null);
                        } else {
                            return cb(null, result);
                        }
                    });

                });
            }
        }
    });

};


exports.findById = function (id, cb) {

    userModel.findOne({id: id}, function (err, user) {
        if (err) {
            return cb(new Error('User : ' + id + ' does not exist'));
        }
        if(user){
            return cb(null, user);
        }

    });
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
        userModel.findOne({username: username}, function (err, user) {
        if (err) {
            return cb(new Error('User : ' + username + ' does not exist'));
        }
        
        if(user){
            return cb(null, user);
        }

    });

};