/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const {check, validationResult} = require('express-validator');
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode} = require('http-status-codes');
//var mUser = require('../model/user');
var account = require('../service/account');
var ApiResponse = require('../../utils/api-response');

exports.findById = function (id, fn) {
    account.findById(id, fn);
};

exports.findByUsername = function (username, fn) {
    account.findByUsername(username, fn);
};

/**
 * List users. 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.listUsers = function(req, res, next){
    
    let users = account.listUser(function(users){
        res.status(StatusCodes.OK).json(new ApiResponse(users, StatusCodes.OK).build());
    }, {}, {offset : req.query.offset, limit : req.query.limit, select : 'firstName lastName displayName provider sername'});
    
};

exports.addUser = function (req, res, next) {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }

        const {firstName, lastName, userName, repeatPassword} = req.body;
        account.addUser(firstName, lastName, userName, repeatPassword, Number(process.env.CRYPTO_WORKFACTOR), function (err, profile) {
            if (err) {
                req.flash('error', err);
                res.redirect('/api/account/authentication/v1/register');
            } else {
                res.redirect('/api/account/authentication/v1/login');
            }
        });
    } catch (err) {
        return next(err);
    }
};

exports.getUserProfile = function(req, res, next){
    try{
        let username = req.session.passport.user;
        let result = account.getUserProfile(username);
        return result;
        
    }catch (err){
        next(err);
    }
};

exports.validate = (method) => {
    switch (method) {
        case 'addUser':
        {
            return [
                check('userName').exists().isLength({min: 5})
                        .trim().escape()
                        .withMessage('Name must have more than 5 characters'),
                check('firstName', 'First name not found').exists(),
                check('lastName', 'Last name not found').exists(),
                check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
                check('repeatPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
            ];
        }
    }
};