/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const {check, validationResult} = require('express-validator');
var mUser = require('../model/user');

exports.findById = function (id, fn) {
    mUser.findById(id, fn);
};

exports.findByUsername = function (username, fn) {
    mUser.findByUsername(username, fn);
};

exports.addUser = function (req, res) {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }

        const {firstName, lastName, userName, repeatPassword} = req.body;
        mUser.addUser(firstName, lastName, userName, repeatPassword, process.env.CRYPTO_WORKFACTOR, function (err, profile) {
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

exports.validate = (method) => {
    switch (method) {
        case 'addUser':
        {
            return [
                check('username').exists().isLength({min: 5})
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