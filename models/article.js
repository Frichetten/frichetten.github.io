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
  Article.find({}, {"title":1, "published":1, "synopsis":1, "link":1, "_id": false}, callback);
}

module.exports.getArticle = function(title, callback){
  const query = {'link': title};
  Article.findOne(query, callback);
}
