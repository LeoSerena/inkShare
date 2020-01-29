var path = require('path')
var express = require('express');
var router = express.Router();

//gets the index page
router.get('/index', function(req, res){
  res.render('index',{
    myPlaceHolder : 'search...'
  })
})
//login page
router.get('/login', function(req, res){
  res.sendFile(path.join(__dirname,'..', 'html', 'index.html'))
})
//sign up page
router.get('/signUp', function(req, res){
  res.sendFile(path.join(__dirname,'..', 'user', 'signup'))
})

//get the error page by default if none is found
router.get('/*', function(req, res){
  res.render('404')
})


module.exports = router;