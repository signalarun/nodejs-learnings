/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const {check, validationResult} = require('express-validator');
var account = require('../service/account');

exports.generateResetPasswordLink = function (req, res, next) {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }
        account.generatePasswordResetLink(req.body.email, function (status) {
            res.json(status);
        });
    } catch (err) {
        return next(err);
    }
};

/* Validation of parameters */
exports.validate = (method) => {
    switch (method) {
        case 'generatePasswordResetLink':
        {
            return [
                check('email')
                //// To delete leading and triling space 
                .trim() 
                // Normalizing the email address 
                .normalizeEmail() 
                // Checking if follow the email  
                // address formet or not 
                .isEmail() 
                // Custom message 
                .withMessage('Invalid email') 
            ];
        }
    }
};