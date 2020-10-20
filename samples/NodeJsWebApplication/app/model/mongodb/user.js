/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');

let userSchema = new mongoose.Schema({
    salt: String,
    password: String,
    work: Number,
    firstName: {type : String, trim : true},
    lastName: {type : String, trim : true},
    displayName: {type : String, trim : true},
    id: String,
    provider: {type : String, trim : true},
    username: {type : String, trim : true},
    active:{type : Boolean, default : true},
    address: {

        address1: {
            type: String,
            trim: true

        },
        address2: {
            type: String,
            trim: true

        },
        zip: {
            type: String,
            trim: true

        },
        state: {
            type: String,
            trim: true

        },
        city: {
            type: String,
            trim: true

        },
        country: {
            type: String,
            trim: true

        }

    }
});

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', userSchema);;


