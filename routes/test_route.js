var express = require('express');
var test_route = express.Router();
var authenticate = require('../middlewares/token_auth')

const queries = require('../config/queries')

// TODO: authenticate for the whole route 

test_route.get('/test', authenticate,  function(req, res){
    res.render('test')
})



// ----------------- BOOKS -------------------

test_route.get('/getBooks', authenticate, function(req, res){
    queries.books.getBooksFromUser(req.userId, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }
        else{res.send(result)}
    })
})


test_route.post('/addBook', authenticate, function(req,res){
    queries.books.addBookFromUSer(req.body.bookId, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }else{res.send(result)}
    })
})

test_route.post('/delBook', authenticate, function(req, res){
    queries.books.delBookFromUser(req.body.bookId, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }else{res.send(result)}
    })
})

test_route.post('/modifBook', authenticate, function(req, res){
    queries.books.modifBookFromUser(req.body, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }else{res.send(result)}
    })
})

// ------------- LISTS --------------

test_route.get('/getListsInfo', authenticate, function(req, res){
    queries.lists.getListInfoFromUser(req.userId, (listsInfo) => res.send(listsInfo))
})


module.exports = test_route;