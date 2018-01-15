const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const Article = require('./models/article');
const path = require('path');

mongoose.connect(config.database, {useMongoClient:true});
mongoose.connection.on('connected', () => {
  console.log("Connected to database " + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
  process.exit();
});

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'angular-frontend/dist')));

const routes = require('./routes/routes');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular-frontend/dist/index.html'));
});

// The blog endpoints
app.post('/blog', (req, res) => {
  Article.getAllArticleThumbs( (err, success) => {
    if(success){
      res.send(success);
    }
  });
});

app.post('/blog/*', (req, res) => {
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
