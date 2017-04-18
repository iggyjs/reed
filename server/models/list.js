const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('../models/article');


module.exports = mongoose.model('List', new Schema({
    user_guid: String, //associated with user
    user_id: String,
    date: String, //date for the list
    articles: [ Article.schema ] //object array of articles
}));
