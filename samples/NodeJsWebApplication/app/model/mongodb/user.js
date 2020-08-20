/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    salt: String,
    password: String,
    work: Number,
    firstName: String,
    lastName: String,
    displayName: String,
    id: String,
    provider: String,
    username: String
});

module.exports = mongoose.model('User', userSchema);