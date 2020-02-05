var express = require('express');
var private_route = express.Router();
var authenticate = require('../middlewares/token_auth')
var User = require('../models/User')

private_route.get('/myPage', authenticate, async function(req, res){

    const id = req.userId
    try{
        const user = await User.findOne({_id : id})
        res.render('privatePage',{
            username : user.username,
            email : user.email
        })
    }catch(err){
        res.status(400).send('a problem occured')
    }

})

module.exports = private_route