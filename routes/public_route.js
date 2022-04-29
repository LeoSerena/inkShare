var express = require('express');
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fs = require('fs')

var public_route = express.Router();

var authenticate = require('../middlewares/token_auth')
var userRegisterationSchema = require('../middlewares/validations').userRegisterationValidation
var userLoginSchema = require('../middlewares/validations').userLoginValidation
var User = require('../models/User')
const queries = require('../config/query_files/queries')
callback = queries.callback

//get the main page
public_route.get('/homepage', authenticate, async function(req, res){
    const username = req.username
    // The following should be done with a middleware
    res.render('homepage', {username : username, homepage : true})
})

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

//get register file
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
            if(!user) return res.status(400).send(err)
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                    return res.status(400).send(err)
                }else{
                    const token = jwt.sign(
                        {_id: user._id, username : user.username, ait : Date.now()}, 
                        process.env.TOKEN_SECRET, 
                        {expiresIn : '30m'}
                    )
                    res.cookie('auth-token', token, {maxAge : 1800000}).send('success')
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
public_route.get('/getUser', authenticate, function(req, res){
    queries.users.getUserById(req.userId, (fail, result) => callback(fail, result, res))
})

// ----------------- FRIENDS -----------------
public_route.post('/addFriend', authenticate, function(req, res){
    queries.friends.friendRequest(req.userId, req.body.friend_credential, (fail, result) => callback(fail, result, res))
})
public_route.post('/respondFriend', authenticate, function(req, res){
    queries.friends.friendRespond(req.userId, req.body.friend_id, req.body.response, (fail, result) => callback(fail, result, res))
})
public_route.post('/removeFriend', authenticate, function(req, res){
    queries.friends.friendDelete(req.userId, req.body.friend_id, (fail, result) => callback(fail, result, res))
})

module.exports = public_route;