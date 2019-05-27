import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as Article from './models/article';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Connect to Database
mongoose.connect(
  "mongodb://mongodb:27017/personal",
  { useNewUrlParser : true }
);
mongoose.connection.on("connected", () => {
  console.log("Connected to database successful");
});

mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Handle tor request
app.get('/torbandwidth', (req, res) => {
  fs.readFile('/home/nick/bandwidth', 'utf8', function(err, contents) {
    res.set({'Cache-Control': 'public, max-age=1800'});
    res.send({"data": contents});
  });
});

// The blog endpoints
app.get('/blogarticles', (req, res) => {
  Article.getAllArticleThumbs( (err, success) => {
    if (success) {
      res.send(success);
    }
  });
});

app.get('/blogarticles/*', (req, res) => {
  var a = req.originalUrl;
  a = a.substring(a.lastIndexOf("/")+1);
  Article.getArticle(a, (err, success) => {
    if(success){
      res.send(success);
    }
  })
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
