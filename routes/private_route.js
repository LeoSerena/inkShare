var express = require('express');
var private_route = express.Router();
var authenticate = require('../middlewares/token_auth')
var User = require('../models/User')
var Book = require('../models/Book')
var bookAddValidation = require('../middlewares/validations').bookAddValidation

private_route.use(authenticate)

private_route.get('/myPage', function(req, res){
    res.render('privatePage', {username : req.username, myPage : true})
})

private_route.get('/getBooks', async function(req, res){
    const username = req.username
    try{
        const books = await Book.find(
            {username : username}, 
            'title author release_year',
            function(err, books){
                if(err){ res.send('a problem occured with the book query on the database') }
                else{
                    res.send(books)
                }
            })
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

private_route.post('/addBook', async function(req, res){
    const username = req.username
    var {error} = bookAddValidation.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }else{
        var book = new Book({
            'title' : req.body.title,
            'author' : req.body.author,
            'release_year' : req.body.release_year,
            'username' : username
        })
        try{
            var book = await book.save()
            res.render('privatePage', {username : req.username, myPage : true})
        }catch(err){
            res.status(400).send(err)
        }
    }

})

private_route.delete('/removeBook', function(req, res){
    const username = req.username
    res.send(username)
})

private_route.post('/modifyBook', function(req, res){
    const username = req.username
    res.send(username)
})

module.exports = private_route