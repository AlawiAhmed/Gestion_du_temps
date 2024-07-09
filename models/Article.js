const mongoose = require('mongoose');
const Schema = mongoose.Schema
const articleschema = new Schema({title: String, body: String,numberof: Number});
const Article = mongoose.model('Article', articleschema);
module.exports = Article;