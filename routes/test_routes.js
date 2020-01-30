var path = require('path')
var express = require('express');
var test_routes = express.Router();

//forms
test_routes.get('/form', function(req, res){
    res.render('form')
})

test_routes.post('/submit', function(req, res){
    console.log(req.body);
    res.send('request received')
});


//cookies
test_routes.get('/cookie', function(req, res){
    console.log('cookie path reached')
    res.cookie('name', 'express', {maxAge : 18000}).send('cookie set');
})

test_routes.get('/cookieget', function(req, res){
    console.log('cookie : ', req.cookies)
    res.send('cookie recieved')
})

test_routes.get('/cookieDel', function(req, res){
    res.clearCookie('express')
    res.send('cookie deleted')
})

module.exports = test_routes