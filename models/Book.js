const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'User'
    },
    title : {
        type: String,
        require: true
    },
    author: {
        type: String,
        default: 'inconnu'
    },
    release_year: {
        type: Number,
        default: 0
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    notes : {
        type : String,
        default : ''
    },
    last_modif : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Book', bookSchema)