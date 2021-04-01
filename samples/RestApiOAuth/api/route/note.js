'use strict'

module.exports = function(app){

    var notesController = require('../controller/note');
    app.route('/note').get(notesController.addNote);
}