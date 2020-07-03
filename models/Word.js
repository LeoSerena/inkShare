const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        require : true,
    },
    word : {
        type: String,
        required : true,
    },
    definition : {
        type : String,
        required : false,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Word', wordSchema)