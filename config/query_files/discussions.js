const Discussion = require('../../models/Discussion')

const getRecentDiscussions = function(callback){
    Discussion.find(
        {'private' : false},
        'title tags language',
        {sort : 'creation_date'},
        (err, discussions) => {
            if(err){callback(1, err)}
            else{callback(0, discussions)}
        }
    )
}

const createDiscussion = function(user_id, data, callback){
    data.owner = user_id
    discussion = new Discussion(data)
    discussion.save((err) => {
        if(err){callback(1, err)}
        else{callback(0, 'success')}
    })
}

const deleteDiscussion = function(discussion_id, callback){
    Discussion.deleteOne({_id : discussion_id},
    (err) => {
        if(err){callback(1, err)}
        else{callback(0, 'success')}
    })
}

const addReference = function(discussion_id, other_id, callback){
    Discussion.updateOne({_id : discussion_id},
    { $push : {references : other_id} },
    (err) => {
        if(err){callback(1, err)}
        else{callback(0, 'success')}
    })
}

module.exports = {
    getRecentDiscussions : getRecentDiscussions,
    createDiscussion : createDiscussion,
    deleteDiscussion : deleteDiscussion,
    addReference : addReference
}