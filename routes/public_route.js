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
    const id = req.userId
    if(id){ //if the user is authenticated
        try{
            const user = await User.findOne({_id : id})
            res.render('homepage',{
                username : user.username,
                email : user.email
            })
        }catch(err){
            res.status(400).send('a problem occured')
        }
    }else{ //if user not authenticted
        res.render('homepage')
    }
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
public_route.get('/contacts', function(req, res){
    res.render('contacts')
})
//get register file
public_route.get('/register', function(req, res){
    res.render('registerForm')
})
//get login file
public_route.get('/login', function(req, res){
    res.render('loginForm')
})

//post of registeration
public_route.post('/register', async function(req, res){

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
        const user = await User.findOne({
            //can either give username or email
            $or: [
                { email : req.body.credentials },
                { username : req.body.credentials }
            ]
        })
        if(!user) return res.status(400).send('username or password incorrect')
    
        const isValid = await bcrypt.compare(req.body.password, user.password)

        if(!isValid){
            return res.status(400).send('username or password incorrect')
        }else{
            const token = jwt.sign({_id: user._id, username : user.username}, process.env.TOKEN_SECRET)
            res.cookie('auth-token', token, {maxAge : 1000000}).render('loginSuccessful')
        }
    }

})

//get the logout
public_route.get('/logout', function(req, res){
    res.clearCookie('auth-token').render('logout')
});

module.exports = public_route;