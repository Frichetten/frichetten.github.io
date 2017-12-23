const express = require('express');
const router = express.Router();

// Blog Test
router.post('/blog', (req, res, next) => {
  res.json({articles: "Nick"});
});

router.get('/blog', (req, res, next) => {
  res.json({articles: "Nick"});
});
