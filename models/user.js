var mongoose = require('mongoose');
var usersSchema = require('../schemas');

module.exports = mongoose.model('User', usersSchema.user);
