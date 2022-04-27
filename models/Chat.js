const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user1 : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    user1 : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    messages :  [{type : String}]
})

module.exports = mongoose.model('Chat', chatSchema)