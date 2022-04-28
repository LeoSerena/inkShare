const Discussion = require('../../models/Discussion')

const postMessage = function(user_id, discussion_id, data, callback){
    data.owner = user_id
    
    Discussion.updateOne(
        { _id : discussion_id },
        { $push : { messages : data }},
        (err) => {
            if(err){callback(1, err)}
            else{callback(0, 'success')}
        }
    )
}

const addPointer = function(){

}

module.exports = {
    postMessage : postMessage,
    addPointer : addPointer
}