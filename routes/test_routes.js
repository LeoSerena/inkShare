var path = require('path')
var express = require('express');
var test_routes = express.Router();

test_routes.get('/form', function(req, res){
    res.render('form')
})

test_routes.post('/submit', function(req, res){
    console.log(req.body);
    res.send('request received')
});

module.exports = test_routes