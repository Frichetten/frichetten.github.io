const express = require('express');

const app = express();

const routes = require('./routes/routes');

app.get('/', (req, res) => {
 res.send("How's it going");
});

// The blog endpoints
app.post('/blog', (req, res) => {
  res.send("Welcome");
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
