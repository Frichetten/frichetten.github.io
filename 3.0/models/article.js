const mongoose = require('mongoose');
const config = require('../config/database');

// Article Schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  }
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.getAllArticles = function(callback) {
  Article.find({title: "First blog post"}, function(err, data) {
    console.log(data);
  });
}

module.exports.saveData = function(data, callback){
  data.save(data);
}
