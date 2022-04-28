const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
    image : {
        data: Buffer,
        contentType: String
    },
    text : {
        type : String
    },
    pointer : {
        discussion_pointer : {
            discussion_id : Schema.Types.ObjectId,
            ref : 'Discussion'
        },
        message_pointer : {
            message_id : Schema.Types.ObjectId,
            ref : 'Message'
        },
        owner : {
            type : Schema.Types.ObjectI,
            ref : 'User'
        },
        timestamp : {
            type : Date,
            default : Date.now
        }
    }
})

module.exports = mongoose.model('Message', messageSchema)