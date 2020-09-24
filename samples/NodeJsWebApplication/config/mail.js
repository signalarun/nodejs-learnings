/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const nodemailer = require('nodemailer');

const mail = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
       user: process.env.EMAIL_USERNAME,
       pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = mail;