const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const Article = require('./models/article');

mongoose.connect(config.database, {useMongoClient:true});
mongoose.connection.on('connected', () => {
  console.log("Connected to database " + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();
app.use(cors());

const routes = require('./routes/routes');

app.get('/', (req, res) => {
 res.send("How's it going");
});

// The blog endpoints
app.post('/blog', (req, res) => {
  Article.getAllArticleThumbs( (err, success) => {
    if(success){
      res.send(success);
    }
  });
});

app.get('/blog/*', (req, res) => {
  a = req.originalUrl;
  a = a.substring(a.lastIndexOf("/")+1);
  Article.getArticle(a, (err, success) => {
    if(success){
      res.send(success);
    }
  })
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
