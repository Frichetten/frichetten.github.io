// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as secrets from './config/secrets';
import * as Article from './models/article';
import * as fs from 'fs';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

mongoose.connect(secrets.database, {useNewUrlParser:true});
mongoose.connection.on('connected', () => {
  console.log("Connected to database " + secrets.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
  process.exit();
});

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist/frichetten-com-server/main`);

enableProdMode();

const app = express();

// Set the engine
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', './dist');

// Static Assets
app.get('*.*', express.static('./dist'));

// Point all routes to Universal
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.post('/torbandwidth', (req, res) => {
  // Here we need to read the file
  fs.readFile('/home/nick/bandwidth','utf8', function(err, contents) {
    res.send({"data" : contents});
  });
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
  var a = req.originalUrl;
  a = a.substring(a.lastIndexOf("/")+1);
  Article.getArticle(a, (err, success) => {
    if(success){
      res.send(success);
    }
  })
});

// Start Express Server
app.listen(4200, () => {
  console.log(`Node Express server listening on http://localhost:8080`);
});