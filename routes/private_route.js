var express = require('express');
var private_route = express.Router();
var authenticate = require('../middlewares/token_auth')
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');
const User = require('../models/User');
const List = require('../models/List');
const { ObjectId } = require('mongodb');
var bookAddValidation = require('../middlewares/validations').bookAddValidation


private_route.use(authenticate)

//display the private page of the user
private_route.get('/myPage', function(req, res){
    // an easy solution (maybe bad) was to refresh the token when accessing the private page
    const token = jwt.sign({_id: req.userId, username : req.username, ait : Date.now()}, process.env.TOKEN_SECRET, {expiresIn : '30m'})
    res.cookie('auth-token', token, {maxAge : 1800000}).render('privatePage', {username : req.username, myPage : true})
})

//------------ LISTS --------------
// fetched the lists that are displayed in private page
private_route.get('/getLists', function(req, res){
    User.findOne(
        {_id : req.userId},
        'my_lists fav_lists',
        function(err, usr){
            if(err){res.status(400).send(err)}
            else{
                List.find({_id : {$in : usr['my_lists']}},
                function(err, my_lists){
                    if(err){res.status(400).send(err)}
                    else{
                        List.find({_id : {$in : usr['fav_lists']}},
                        function(err, fav_lists){
                            if(err){res.status(400).send(err)}
                            else{
                                let body = {}
                                body['my_lists'] = my_lists
                                body['fav_lists'] = fav_lists
                                res.send(body)
                            }
                        })
                    }
                })
            }
        }
    )
})

// adds a new list
private_route.post('/addList', function(req, res){

    //validate list
    let list_name = req.body['name']
    let creator = req.userId
    let themes = req.body['themes']

    let list = new List({
        original_creator : creator,
        name : list_name,
        themes : themes
    })

    
    list.save(function(err, list){
        if(err){ res.status(400).send(err) }
        else{     
            User.findOneAndUpdate(
            { _id : req.userId },
            { $push : {my_lists : list._id}},
            function(err){ 
                if(err){ res.status(400).send(err) }
                else{ res.redirect('/private/myPage') } 
            })} 
    })
})

// ----------- BOOKS --------------
//fetches the books of the user to be displayed on its private page
private_route.get('/getBooks', function(req, res){
    Book.find(
        { userId : req.userId },
        'title author release_year creation_date _id',
        {sort : {author : 1}},
        function(err, books){
            if(err){
                console.log(err) 
                res.status(400).send(err) }
            else {
                res.send(books)
            }
    })

})

//store a new book from the user in the database
private_route.post('/addBook', function(req, res){
    var { error } = bookAddValidation.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }else{
        if(req.userId){
            //create the new book
            var book = new Book({
                'userId' : req.userId,
                'title' : req.body.title,
                'author' : req.body.author,
                'release_year' : req.body.release_year
            })
            book.save(function(err){ 
                if(err){ res.status(400).send(err) }
                else{ res.redirect('/private/myPage') } 
            })

        }else{
            res.status(400).send('please log in again')
        }
    }
})

//deletes the book given
private_route.post('/deleteBook', function(req, res){
    Book.deleteOne(
        {_id : req.body['id']},
        function(err){ 
            if(err) {res.send(err)}
            else { res.redirect('/private/myPage') }
        }
    )
})

private_route.post('/modifyBook', function(req, res){
            // THIS NEEDS TO BE VALIDATED -- TODO
    let result = Book.findOneAndUpdate(
        { '_id' : req.body['book_id']}, 
        { '$set' : {
            'title' : req.body['title'],
            'author' : req.body['author'],
            'release_year' : req.body['release_year'],
            'notes' : req.body['notes'],
            'last_modif' : Date.now()
        }},
        function(err){if(err) { res.send(err) }})
})

private_route.get('/myBooks/notes/:id', function(req, res){
    id = req.params.id.split('=')[1]
    Book.findOne(
        {_id : id},
        function(err, notes){
            if(err){ res.send(err) }
            else{
                res.send(notes)
            }
        })
})

module.exports = private_route