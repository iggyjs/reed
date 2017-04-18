const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    user_guid: String, //associated with user
    date: String, //date for the list
    articles: [] //object array of articles
}));
