var express = require('express');
var test_route = express.Router();

var authenticate = require('../middlewares/token_auth')
var bookAddValidation = require('../middlewares/validations').bookAddValidation

const queries = require('../config/query_files/queries')



// TODO: authenticate for the whole route 

test_route.get('/test', authenticate,  function(req, res){
    res.render('test')
})

// ----------------- USER -------------------

test_route.get('/getUser', authenticate, function(req, res){
    queries.users.getUserById(req.userId, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }else{
            res.send(result)
        }
    })
})

test_route.post('/addFriend', authenticate, function(req, res){
    queries.users.addFriend(req.userId, req.body.friend_credential, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }else{
            res.send(result)
        }
    })
})

// ----------------- BOOKS -------------------

test_route.get('/getBook', authenticate, function(req, res){
    queries.books.getBookFromUser(req.query.book_id, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }
        else{res.send(result)}
    })
})

test_route.get('/getBooks', authenticate, function(req, res){
    queries.books.getBooksFromUser(req.userId, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }
        else{res.send(result)}
    })
})


test_route.post('/addBook', authenticate, async function(req,res){
    const { error } = await bookAddValidation.validate(req.body.book)
    if(error){console.log(error.details[0].message)}
    else{
        queries.books.addBookFromUSer(req, (failure, result) => {
            if(failure){
                console.log(result)
                res.send(result)
            }else{res.send(result)}
        })
    }
})

test_route.post('/delBook', authenticate, function(req, res){
    queries.books.delBookFromUser(req.body.bookId, (failure, result) => {
        if(failure){
            console.log(result)
            res.send(result)
        }else{res.send(result)}
    })
})

test_route.post('/modifBook', authenticate, async function(req, res){
    let book_id = req.body._id
    delete req.body._id
    delete req.body.creation_date
    delete req.body.last_modif
    const { error } = await bookAddValidation.validate(req.body)
    if(error){
        console.log(error.details[0].message)
        return 'failure'
    }else{
        queries.books.modifBookFromUser(req.body, book_id, (failure, result) => {
            if(failure){
                console.log(result)
                res.send(result)
            }else{res.send(result)}
        })
    }
})

// ------------- LISTS --------------

test_route.get('/getListsInfo', authenticate, function(req, res){
    queries.lists.getListInfoFromUser(req.userId, (listsInfo) => res.send(listsInfo))
})


module.exports = test_route;