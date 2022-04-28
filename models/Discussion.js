const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    references : [{type : Schema.Types.ObjectId, ref : 'Discussion'}],
    creation_date : {
        type: Date,
        default : Date.now
    },
    last_modif : {
        type: Date
    },
    tags : [{type : String}],
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    co_owners : [{
        type : Schema.Types.ObjectId, 
        ref : 'User'
    }],
    messages : [{type : Schema.Types.ObjectId, ref : 'Message'}],
    language : {
        type : 'String',
        default : 'english'
    }
})

// Creates a text type B+tree index on the title and the tags
discussionSchema.index( 
    { title : 'text', tags : 'text' },
    { 
        default_language : 'english',
        language_overrride : 'language'
    }
)

module.exports = mongoose.model('Discussion', discussionSchema)