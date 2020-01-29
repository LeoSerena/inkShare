var path = require('path')
var express = require('express');
var router = express.Router();

//gets the index page
router.get('/index', function(req, res){
  res.render('index',{
    myPlaceHolder : 'search...'
  })
})
//get the error page by default if none is found
router.get('/*', function(req, res){
  res.render('404')
})

module.exports = router;