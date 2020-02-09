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
    var {error} = bookAddValidation.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }else{
        const username = req.username
        if(username){
            var book = new Book({
                'title' : req.body.title,
                'author' : req.body.author,
                'release_year' : req.body.release_year,
                'username' : username
            })
            try{
                await book.save()
                res.redirect('/private/myPage')
            }catch(err){
                res.status(400).send(err)
            }
        }else{
            res.status(400).send(err)
        }
    }
})

private_route.post('/deleteBook', async function(req, res){
    let id = req.body['id']
    try{
        await Book.deleteOne({_id : id})
        res.send({'id' : id})
    }catch(err){
        res.send(err)
    }

})

private_route.post('/modifyBook', function(req, res){
    const username = req.username
    res.send(username)
})

module.exports = private_route