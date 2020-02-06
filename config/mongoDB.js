var mongoose = require('mongoose');
var dotenv = require('dotenv')
var User = require('../models/User.js')

dotenv.config();

const str = process.env.DB_CONNECT

var connect = async function(){
    try{
        mongoose.connect(
            str,
            { useNewUrlParser : true,
             useUnifiedTopology: true },
            ()=> console.log('connected to db')
        )
    }catch(err){
        console.error(err)
    }

}


const user = new User({
    name : 'Bernard Minet',
    email : 'bernard.minet@yahoo.fr',
    password : 'clubDo'
})

var postUser = async function(){
    try{
        const savedUser = await user.save()
        console.log(savedUser)
    }catch(err){
        console.log(err)
    }
}

module.exports = connect;