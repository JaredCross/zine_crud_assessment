var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.DB_HOST || process.env.MONGOLAB_URI);
var articles = db.get('articles');


var title = 'The Zine';

router.get('/articles', function (req, res, next) {
  res.render('index', {title : title});
});

router.get('/articles/new', function (req, res, next) {
  res.render('articles/new');
});

router.post('/articles', function (req, res, next) {
  articles.insert(
    {
      title : req.body.title,
      backgroundImg : req.body.background,
      isDark : req.body.dark,
      excerpt : req.body.excerpt,
      body : req.body.body
    });
  res.redirect('/articles');
});




module.exports = router;
