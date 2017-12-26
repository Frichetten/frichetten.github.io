const mongoose = require('mongoose');
const config = require('../config/database');

// Article Schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}, {collection: 'personal'});

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.getAllArticleThumbs = function(callback) {
  Article.find({}, {"title":1, "_id": false}, callback);
}
