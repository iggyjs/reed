const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    user_guid: Number, //associated with user
    date: String, //date for the lsit
    articles: [] //object array of articles
}));
