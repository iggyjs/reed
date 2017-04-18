const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('../models/list');

module.exports = mongoose.model('User', new Schema({
    guid: String,
    name: String,
    following: [],
    followers: [],
    followRequests: [],
    password: String,
    admin: Boolean
}));
