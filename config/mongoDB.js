var mongoose = require('mongoose');
var dotenv = require('dotenv')
const User = require('../models/User');

dotenv.config();

const str = process.env.DB_CONNECT

/**
 * Connects to the MongoDB database
 */
var connect = async function(){
    await mongoose.connect(
        str,
        {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            //useFindAndModify : false
        }
    ).then(
        () => console.log('connected to mongoDB'),
        err => console.log(err)
    )
}

module.exports = connect;