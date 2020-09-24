/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let mongoose = require('mongoose');

let resetTokenSchema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.ObjectId, auto: true },  
  email : String,
  token : String,
  expiration : Date,
  used : Boolean
}, { timestamps: true });

module.exports = mongoose.model('ResetToken', resetTokenSchema);
