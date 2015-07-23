var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.DB_HOST || process.env.MONGOLAB_URI);
var articles = db.get('articles');
var validations = require('../src/validations.js');


var title = 'The Zine';

router.get('/articles', function (req, res, next) {
  articles.find({}, function (err, data) {
    res.render('articles/index', {title : title, data : data});
  });
});

router.get('/articles/new', function (req, res, next) {
  res.render('articles/new');
});

router.post('/articles', function (req, res, next) {
  var validate = validations(req.body.title, req.body.excerpt, req.body.body);
  if(validate) {
    res.render('articles/new',
      {
        article :
          {
            title : req.body.title,
            backgroundImg : req.body.background,
            isDark : req.body.dark,
            excerpt : req.body.excerpt,
            body : req.body.body
          },
       errors : validate, title : title});
  } else {
    articles.insert(
      {
        title : req.body.title,
        backgroundImg : req.body.background,
        isDark : req.body.dark,
        excerpt : req.body.excerpt,
        body : req.body.body
      });
    res.redirect('/articles');
  }

});

router.get('/articles/:id', function (req, res, next) {
  articles.findOne({_id:req.params.id}, function (err, data) {
    res.render('articles/show', {title : title, article : data});
  });
});

router.get('/articles/:id/edit', function (req, res, next) {
  articles.findOne({_id : req.params.id}, function (err, data) {
    res.render('articles/edit', {title : title, article : data});
  });
});

router.post('/articles/:id', function (req, res, next) {
  var validate = validations(req.body.title, req.body.excerpt, req.body.body);
  if(validate) {
    res.render('articles/edit',
      {
        article :
          {
            title : req.body.title,
            backgroundImg : req.body.background,
            isDark : req.body.dark,
            excerpt : req.body.excerpt,
            body : req.body.body,
            _id : req.params.id
          },
       errors : validate, title : title});
  } else {
    articles.update(
      {
        _id : req.params.id
      },
      {
        $set :
          {
            title : req.body.title,
            backgroundImg : req.body.background,
            isDark : req.body.dark,
            excerpt : req.body.excerpt,
            body : req.body.body
          }
      });
      res.redirect('/articles/' + req.params.id);
    }
});

router.post('/articles/:id/delete', function (req, res, next) {
  articles.remove({ _id : req.params.id});
  res.redirect('/articles');
});




module.exports = router;
