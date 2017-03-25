const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    user_guid: String, //associated with user
    listTitle: String,
    date: String, //date for the lsit
    articles: [] //object array of articles
}));
