/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const passwordUtil = require('../../config/password');
let userModel = require('../model/mongodb/user');


exports.addUser = function (firstName, lastName, userName, password, work, cb) {

    userModel.exists({name: userName}, function (err, doc) {
        if (err) {
            return cb({errorCode: 1, message: 'User exists!'}, 'User exists!', null);
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
    });

};