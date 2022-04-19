const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const Schema = mongoose.Schema;

const elementSchema = new mongoose.Schema({
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
        type : ObjectID,
        required : true,
        ref : 'User'
    },
    last_modification : {
        type : Date,
        default : Date.now,
    },
    name : {
        type : String,
        required : true,
    },
    themes : {type : String},
    size : {
        type : Number,
        default : 0,
    },
    read_rights : {
        type : [String],
        default : ['owner']
    },
    write_rights : [{type : Schema.Types.ObjectId, ref : 'User'}],
    list : [{type : elementSchema}]
})

module.exports = mongoose.model('List', listSchema)