'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = Schema({
    name : String,
    email : String,
})

module.exports = mongoose.model('Contact', contactSchema)