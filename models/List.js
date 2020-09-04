const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const wordSchema = new mongoose.Schema({
    element1 : {
        type : String,
        required : true,
    },
    element2 : {
        type : String,
        required : true,
    }
})

const listSchema = new Schema({
    creation_date : {
        type : Date,
        default : Date.now,
    },
    original_creator : {
        type : String,
        required : true,
    },
    last_modification : {
        type : Date,
        default : Date.now,
    },
    name : {
        type : String,
        required : true,
    },
    size : {
        type : Number,
        default : 0,
    }, 
    read_rights : [{type : Schema.Types.ObjectId, ref : 'User'}],
    write_rights : [{type : Schema.Types.ObjectId, ref : 'User'}],
    list : [{type : wordSchema}]
})

module.exports = mongoose.model('List', listSchema)