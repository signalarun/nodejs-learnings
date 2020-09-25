/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const {check, validationResult} = require('express-validator');
var account = require('../service/account');

/**
 * Generates form to password reset based upon the validity of the token
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {unresolved}
 */
exports.generatePasswordResetForm = function (req, res, next) {
    try {

        account.generatePasswordResetForm(req.query.email, req.query.token, function (record) {
            if (record === null) {
                return res.render('reset-password', {
                    message: 'Token has expired! Please try password reset again.',
                    showForm: false,
                    title : 'Reset password'
                });
            }

            res.render('reset-password', {
                showForm: true,
                record: record,
                title : 'Reset password'
            });
        });
    } catch (err) {
        return next(err);
    }
};

/**
 * Resets password with user provided new password based upon the validity of 
 * the token
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
exports.resetPassword = function (req, res, next) {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(200).json({ status : 'error', code : 422, msg : 'Validation failed', errors: errors.array()});
            return;
        }
        
        account.resetPassword(req.body.email, req.body.token, req.body.password, function(result){
            res.json(result);
        });
    } catch (err) {
        return next(err);
    }
};

exports.validate = (method) => {
    switch (method) {
        case 'resetPassword':
        {
            return [
                check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
                check('repeatPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
            ];
        }
    }
};