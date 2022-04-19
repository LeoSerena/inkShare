var express = require('express');
var test_route = express.Router();
var authenticate = require('../middlewares/token_auth')

const queries = require('../config/queries')

test_route.get('/test', authenticate,  function(req, res){
    res.render('test')
})

test_route.get('/getBooks', authenticate, function(req, res){
    queries.getBooksFromUser(req.userId, (books) => res.send(books))
})

test_route.get('/getListsInfo', authenticate, function(req, res){
    queries.getListInfoFromUser(req.userId, (listsInfo) => res.send(listsInfo))
})


module.exports = test_route;