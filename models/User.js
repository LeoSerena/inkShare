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
    my_lists : [{type : Schema.Types.ObjectId, ref : 'List'}],
    fav_lists : [{type : Schema.Types.ObjectId, ref : 'List'}]
})

module.exports = mongoose.model('User', userSchema)