const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    friend_list : [{type : Schema.Types.ObjectId, ref : 'User'}],
    friend_request_pending : [{type : Schema.Types.ObjectId, ref : 'User'}],
    friend_request_sent : [{type : Schema.Types.ObjectId, ref : 'User'}],
    lists_owned : [{type : Schema.Types.ObjectId, ref : 'List'}],
    lists_followed : [{type : Schema.Types.ObjectId, ref : 'List'}]
})

module.exports = mongoose.model('User', userSchema)