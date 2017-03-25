const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    guid: String,
    name: String,
    following: [],
    followers: [],
    followRequests: [],
    password: String,
    admin: Boolean
}));
