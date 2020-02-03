var express = require('express');
var test_routes = express.Router();
var User = require('../models/User')
var userRegisterationSchema = require('../middlewares/validations').userRegisterationValidation
var userLoginSchema = require('../middlewares/validations').userLoginValidation
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

//forms
test_routes.get('/form/register', function(req, res){
    res.render('registerForm')
})
test_routes.get('/form/login', function(req, res){
    res.render('loginForm')
})

test_routes.post('/submit/login', async function(req, res){

    const { error } = userLoginSchema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }else{
        const user = await User.findOne({
            //can either give username or email
            $or: [
                { email : req.body.credentials},
                { username : req.body.credentials}
            ]
        })
    
        if(!user) return res.status(400).send('username or password incorrect')
    
        const isValid = await bcrypt.compare(req.body.password, user.password)

        if(!isValid){
            return res.status(400).send('username or password incorrect')
        }else{
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
            res.cookie('auth-token', token, {maxAge : 1000000}).render('loginSuccessful')
        }
    }

})

test_routes.post('/submit/register', async function(req, res){

    const emailExists = await User.findOne({email : req.body.email})
    if(emailExists) return res.status(400).send('An account with the given email already exists')
    const userNameExists = await User.findOne({username : req.body.email})
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


//cookies
test_routes.get('/cookie', function(req, res){
    console.log('cookie path reached')
    res.cookie('name', 'express', {maxAge : 18000}).send('cookie set');
})

test_routes.get('/cookieget', function(req, res){
    console.log('cookie : ', req.cookies)
    res.send('cookie recieved')
})

test_routes.get('/cookieDel', function(req, res){
    res.clearCookie('express')
    res.send('cookie deleted')
})

module.exports = test_routes