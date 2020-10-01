/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const passwordUtil = require('../../config/password');
const mail = require('../../config/mail');
const util = require('../../utils/utils');

let userModel = require('../model/mongodb/user');
let resetTokenModel = require('../model/mongodb/reset-token');


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
        if (user) {
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

        if (user) {
            return cb(null, user);
        }

    });

};

// TODO check async await usage
exports.getUserProfile = async function(username){
    let result;
    try{
     result = await userModel.findOne({username: username}).exec();
    }catch(error){
        throw error;
    }
};

/**
 * Generates password reset link by registered email, its by this link the user
 * gets reset password form
 */
exports.generatePasswordResetLink = async function (e_mail, cb) {
    console.log(e_mail);
    // TODO verify username exists
    //ensure that you have a user with this email
    var user = await userModel.findOne({'username' : e_mail}).exec(); 
    if (user.username == null) {
        /**
         * we don't want to tell attackers that an
         * email doesn't exist, because that will let
         * them use this form to find ones that do
         * exist.
         **/
        return cb({status: 'Email not found'});
    }
    /**
     * Expire any tokens that were previously
     * set for this user. That prevents old tokens
     * from being used.
     **/
    await resetTokenModel.updateMany({ 'email' : e_mail }, { used: true }).exec();
    
    //Create a random reset token
    var token = util.generateRandomToken();
    
    //token expires after one hour
    var expireDate  = new Date();
    expireDate .setHours(expireDate .getHours() + 4);
    
    //insert token data into DB
    await resetTokenModel.create({
        'email' : e_mail,
        'expiration' : expireDate,
        'token' : token,
        'used' : false
    });
    
    //create email
    const message = {
        from: process.env.SENDER_ADDRESS,
        to: e_mail,
        replyTo: process.env.REPLYTO_ADDRESS,
        subject: process.env.FORGOT_PASS_SUBJECT_LINE,
        text: 'To reset your password, please click the link below.\n\nhttp://' + process.env.DOMAIN + ':' + process.env.PORT + '/api/account/authentication/v1/reset-password?token=' + encodeURIComponent(token) + '&email=' + e_mail
    };

    //send email
    mail.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });

    return cb({status: 'ok'});
};

exports.generatePasswordResetForm = async function(email, token, cb){
    /**
   * This code clears all expired tokens. You
   * should move this to a cronjob if you have a
   * big site. We just include this in here as a
   * demonstration.
   **/
  await resetTokenModel.deleteMany({
      'expiration' : { $lte: new Date()}
  }).exec();
 
  //find the token
  var record = await resetTokenModel.findOne({
      'email' : email,
      'expiration' : { $gte : new Date()},
      'token' : token,
      'used' : false
  }).exec();
  cb(record);
};

exports.resetPassword = async function (e_mail, token, password, cb) {

    var record = await resetTokenModel.findOne({
        'email' : e_mail,
        'expiration' : {$gte: new Date()},
        'token' : token,
        'used' : false
    }).exec();

    if (record === null) {
        return cb({status: 'error', message: 'Token not found. Please try the reset password process again.'});
    }

    var upd = await resetTokenModel.updateMany({'email': e_mail}, {$set : {'used': true}} );

    passwordUtil.encryptPassword(password, function (err, nSalt, nPassword) {
        if (err) {
            return cb({status: 'error', errorCode: 500, message: 'Something went wrong, retry'});
        }

        userModel.updateOne({'username': e_mail}, {$set : {'password': nPassword, 'salt': nSalt}}, function (error, result) {
            
            if(err){
                console.log(err);
                cb({status: 'error', errorCode: 500, message: 'Something went wrong, retry'});
            }else{
             cb({status: 'ok', message: 'Password reset. Please login with your new password.'});
            }
        });

    });

};