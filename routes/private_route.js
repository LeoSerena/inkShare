var express = require('express');
var private_route = express.Router();
var authenticate = require('../middlewares/token_auth')
var Book = require('../models/Book')
var Word = require('../models/Word')
var bookAddValidation = require('../middlewares/validations').bookAddValidation
var wordAddValidation = require('../middlewares/validations').wordAddValidation


private_route.use(authenticate)

//display the private page of the user
private_route.get('/myPage', function(req, res){
    res.render('privatePage', {username : req.username, myPage : true})
})

// ----------- BOOKS --------------
//fetches the books of the user to be displayed on its private page
private_route.get('/getBooks', async function(req, res){
    const username = req.username
    try{
        const books = await Book.find(
            {username : username}, 
            'title author release_year',
            function(err, books){
                if(err){ res.send('a problem occured with the books query on the database') }
                else{
                    res.send(books)
                }
            })
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

//stored a new book from the user in the database
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

//deletes the book given
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

//----------- WORDS --------------
private_route.get('/getWords', async function(req, res){
    const userId = req.userId
    try{
        const words = await Word.find(
            {userId : userId},
            'word date',
            function(err, words){
                if(err){ res.send('a problem occured with the words query on the database')}
                else{ res.send(words) }
            }
            )
    }catch(err){
        console.log(err)
        res.send(err)
    }

})
private_route.post('/addWord',async function(req, res){
    const userId = req.userId
    var { error } = wordAddValidation.validate(req.body)
    if(error){ res.status(400).send(error.details[0].message) }
    else{
        var word = new Word({
            'userId' : userId,
            'word' : req.body.word,
            'definition' : req.body.definition_input
        })
        try{
            await word.save()
            res.redirect('/private/myPage')
        }catch(err){
            console.log(err)
            res.send(err)
        }
    }

})
private_route.post('/deleteWord', async function(req, res){
    let id = req.body['id']
    try{
        await Word.deleteOne({_id : id})
        res.send({'id' : id})
    }catch(err){
        res.send(err)
    }
})
private_route.post('/modifyWord', function(req, res){
    
})

module.exports = private_route