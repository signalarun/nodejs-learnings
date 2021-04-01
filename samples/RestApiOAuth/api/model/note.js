"use strict"
var mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    pageNumber: Number,
    name: { type: String, trim: true },
});

module.exports = mongoose.model('Note', noteSchema);