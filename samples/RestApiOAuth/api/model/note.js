"use strict"
var mongoose = require('mongoose');

var noteScheme = new mongoose.Schema({
    pageNumber: Number,
    name: { type: String, trim: true },
});

module.exports = mongoose.model('Note', noteSchema);