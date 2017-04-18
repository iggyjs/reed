const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Article', new Schema({
    articleTitle: String,
    articleLink: String,
    articleDescription: String
}));
