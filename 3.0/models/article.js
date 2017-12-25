const mongoose = require('mongoose');
const config = require('../config/database');

// Article Schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  }
}, {collection: 'personal'});

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.getAllArticles = function(callback) {
  Article.find({}, function(err, data) {
    console.log(data);
  });
}

module.exports.saveData = function(data, callback){
  data.save(data);
}
