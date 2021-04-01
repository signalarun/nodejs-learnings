'use strict'
var mongoose = require('mongoose');
let Note = require('../model/note')

exports.addNote = function (req, res) {
    try {
      
        res.json("Hello world");

    } catch (err) {
        return next(err);
    }
};

exports.listNote = function (req, res) {
    try {
        
        res.json("Hello world");

    } catch (err) {
        return next(err);
    }
};