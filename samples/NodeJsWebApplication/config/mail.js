/* 
 @deprecated Mail configuration.This configuration is tested for  Gmail after activating
             less secure mode in Gmail.
 @author 

 */

const nodemailer = require('nodemailer');
const chalk = require('chalk');

if (process.env.NODE_ENV === 'development') {
  let  mail = nodemailer.createTransport({

        service: process.env.EMAIL_SERVICE_NAME,
        secure: false,
        auth: {

            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_USER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false//process.env.EMAIL_TLS_REJECT_UNAUTHORISED
        }
    });
    module.exports = mail;
    
    console.log(chalk.yellow('Using development configuration for mail'));

} else { // Indicates production environment
    // TODO configure mail for production environment here
   let mail = nodemailer.createTransport({

        service:  process.env.EMAIL_SERVICE_NAME,
        secure: true,
        auth: {

            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_USER_PASSWORD
        }
    });
    module.exports = mail;
    console.log(chalk.green('Using production configuration for mail'));
}

/*
 const mail = nodemailer.createTransport({
 host: process.env.EMAIL_HOST,
 port: process.env.EMAIL_PORT,
 service : 'gmail',
 auth: {
 type : 'login',
 user: process.env.EMAIL_USERNAME,
 pass: process.env.EMAIL_PASSWORD
 },
 secureConnection: 'false',
 tls: {
 ciphers: 'SSLv3',
 rejectUnauthorized: false
 
 }
 
 });
 */
