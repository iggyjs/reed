const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('../models/article');

module.exports = mongoose.model('User', new Schema({
    guid: String,
    name: String,
    list: [ List.schema ],
    following: [],
    followers: [],
    followRequests: [],
    password: String,
    admin: Boolean
}));
