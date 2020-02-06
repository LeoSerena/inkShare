const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
    date_of_creation: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        require : true
    }
})

module.exports = mongoose.model('Book', bookSchema)