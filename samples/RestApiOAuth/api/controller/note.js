'use strict'
var mongoose = require('mongoose');
var Task = mongoose.model('Note');

exports.addNote = function (req, res) {
    try {
      
        res.json("Hello world");

    } catch (err) {
        return next(err);
    }
};

exports.listNote = function (req, res) {
    try {
        
        res.json({["Hello world", "Hello world", "Hello world"]});

    } catch (err) {
        return next(err);
    }
};