var express = require('express');
var public_route = express.Router();
var authenticate = require('../middlewares/token_auth')
var fs = require('fs')
var User = require('../models/User')
var userRegisterationSchema = require('../middlewares/validations').userRegisterationValidation
var userLoginSchema = require('../middlewares/validations').userLoginValidation
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


//get the main page
public_route.get('/homepage', authenticate, async function(req, res){
    const username = req.username
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

//get the contacts
public_route.get('/contacts', authenticate, function(req, res){
    res.render('contacts', {username : req.username, contact_page : true})
})
//get register file
public_route.get('/register', function(req, res){
    res.render('registerForm', {register_page : true})
})
//get login file
public_route.get('/login', function(req, res){
    res.render('loginForm', {login_page : true})
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
            res.render('registSuccessful')
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
                    const token = jwt.sign({_id: user._id, username : user.username, ait : Date.now()}, process.env.TOKEN_SECRET, {expiresIn : '30m'})
                    res.cookie('auth-token', token, {maxAge : 1800000}).redirect('/homepage')
                }
            })
        })
    }

})

//get the logout
public_route.get('/logout', function(req, res){
    res.clearCookie('auth-token').redirect('/homepage')
});

module.exports = public_route;