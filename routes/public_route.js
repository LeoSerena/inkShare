var express = require('express');
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fs = require('fs')

var public_route = express.Router();

const token = require('../middlewares/token_auth')
const userRegisterationSchema = require('../middlewares/validations').userRegisterationValidation
const userLoginSchema = require('../middlewares/validations').userLoginValidation
const User = require('../models/User')
const queries = require('../config/query_files/queries')
const bookAddValidation = require('../middlewares/validations').bookAddValidation
callback = queries.callback

public_route.use(token.authenticate)

public_route.get('/homepage', function(req, res){res.render('homepage', {username : req.username})})
public_route.get('/userPage', function(req, res){res.render('userPage', {username : req.username})})

//get the pdf view of the club rules
public_route.get('/charte', function(req, res){
    var file = './public/files/charte.pdf'
    fs.readFile(file, function(err, data){
        if(err){
            res.status(400).send('ressourse unavailable')
        }else{
            res.contentType('application/pdf');
            res.send(data);
        }
    })
})

public_route.get('/register', function(req, res){
    res.render('registerPage', {register_page : true})
})

//post of registeration
public_route.post('/register', async function(req, res){
    //TODO: perform this in a single query and with a callback
    const emailExists = await User.findOne({email : req.body.email})
    if(emailExists) return res.status(400).send('An account with the given email already exists')
    const userNameExists = await User.findOne({username : req.body.username})
    if(userNameExists) return res.status(400).send('Username already taken')

    const { error } = await userRegisterationSchema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }else{

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        body = req.body
        var user = new User({
            'username' : body.username,
            'email' : body.email,
            'password' : hashedPassword
        })
        try{
            var savedUser = await user.save()
            res.send('success')
        }catch(err){
            res.status(400).send(err)
        }

    }

});

//post of the login
public_route.post('/login', async function(req, res){
    const { error } = userLoginSchema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }else{
        User.findOne({
            //can either give username or email
            $or: [
                { email : req.body.credentials },
                { username : req.body.credentials }
            ]
        }, function(err, user){
            if(!user) return res.send('user not found')
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err||!result){
                    return res.send('incorrect password')
                }else{
                    const access_token = jwt.sign(
                        {_id: user._id, username : user.username, ait : Date.now()}, 
                        process.env.TOKEN_SECRET, 
                        {expiresIn : '20m'}
                    )
                    const refreshToken = jwt.sign(
                        {username : user.username},
                        process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}
                    )
                    res.cookie('auth-token', access_token, {maxAge : 20 * 60 * 1000})
                    res.cookie('refresh-token', refreshToken, { 
                        httpOnly: true, 
                        secure: true, 
                        maxAge: 24 * 60 * 60 * 1000 
                    })
                    res.send('success')
                }
            })
        })
    }

})

//get the logout
public_route.get('/logout', function(req, res){
    res.clearCookie('auth-token').send('success')
});


// ----------------- USER -------------------
public_route.get('/getUser', function(req, res){
    queries.users.getUserById(req.userId, (fail, result) => callback(fail, result, res))
})

// ----------------- FRIENDS -----------------
public_route.post('/addFriend', function(req, res){
    queries.friends.friendRequest(req.userId, req.body.friend_credential, (fail, result) => callback(fail, result, res))
})
public_route.post('/respondFriend', function(req, res){
    queries.friends.friendRespond(req.userId, req.body.friend_id, req.body.response, (fail, result) => callback(fail, result, res))
})
public_route.post('/removeFriend', function(req, res){
    queries.friends.friendDelete(req.userId, req.body.friend_id, (fail, result) => callback(fail, result, res))
})

// ----------------- BOOKS -------------------

public_route.get('/getBook', function(req, res){
    queries.books.getBookFromUser(req.query.book_id, (fail, result) => callback(fail, result, res))
})
public_route.get('/getBooks', function(req, res){
    queries.books.getBooksFromUser(req.userId, (fail, result) => callback(fail, result, res))
})
public_route.post('/addBook', async function(req,res){
    const { error } = await bookAddValidation.validate(req.body.book)
    if(error){console.log(error.details[0].message)}
    else{
        queries.books.addBookFromUSer(req, (fail, result) => callback(fail, result, res))
    }
})
public_route.post('/delBook', function(req, res){
    queries.books.delBookFromUser(req.body.bookId, (fail, result) => callback(fail, result, res))
})
public_route.post('/modifBook', async function(req, res){
    let book_id = req.body._id
    delete req.body._id
    delete req.body.creation_date
    delete req.body.last_modif
    const { error } = await bookAddValidation.validate(req.body)
    if(error){
        console.log(error.details[0].message)
        return 'failure'
    }else{
        queries.books.modifBookFromUser(req.body, book_id, (fail, result) => callback(fail, result, res))
    }
})

// ---------------- DISCUSSIONS ------------------

public_route.get('/getUserDiscussions', function(req, res){

})

public_route.get('/getRecentDiscussions', function(req, res){

})

public_route.post('/addDiscussion', function(req, res){
    // validate discussion
    let discussion = {
        title : 'Soil',
        tags : ['the', 'very', 'first'],
    }
    queries.discussions.createDiscussion(req.userId, discussion, (fail, result) => callback(fail, result, res))
})

public_route.post('/deleteDiscussion', function(req, res){

})

public_route.get('/searchDiscussion', function(req, res){

})

public_route.post('/message', function(req, res){

})

public_route.use(token.refresh)

module.exports = public_route;