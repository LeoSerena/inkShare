const User = require('../../models/User');


const friendRequest = function(user_id, friend_credential, callback){
    User.findOne(
        {$or : [
            { username : friend_credential},
            { email : friend_credential}
        ]},
        '_id username email'
    ).exec((err, friend) => {
        if(err||!friend){
            callback(1, 'The given username or email was not found')
        }else if (friend.username!=friend_credential && friend.email!=friend_credential){
            callback(1, 'The given username or email was not found')
        }else{
            // Add friend request pending
            User.updateOne(
                {_id : user_id},
                { $push : {friend_request_sent : friend._id}}
            ).exec((err) => {
                if(err){callback(1, err)}
                else{
                    // send friend request
                    User.updateOne(
                        {_id : friend._id},
                        {$push : {friend_request_pending : user_id}}
                    ).exec((err) => {
                        if(err){callback(1, err)}
                        else{callback(0, 'success')}
                    })
                }
            })
        }
    })
}

const friendRespond = function(user_id, friend_request_id, response, callback){
    if(response=='accept'){
        User.updateOne(
            {_id : user_id},
            {
                $push : {friend_list : friend_request_id},
                $pull : {friend_request_pending : friend_request_id}
            }
        ).exec((err) => {
            if(err){callback(1, err)}
            else{
                User.updateOne(
                    {_id : friend_request_id},
                    {
                        $push : {friend_list : user_id},
                        $pull : {friend_request_sent : user_id}
                    }
                ).exec((err) => {
                    if(err){callback(1, err)}
                    else{callback(0, 'success')}
                })
            }
        })
    }else{
        User.updateOne(
            {_id : user_id},
            { $pull : {friend_request_pending : friend_request_id} }
        ).exec((err) => {
            if(err){callback(1, err)}
            else{
                User.updateOne(
                    {_id : friend_request_id},
                    { $pull : {friend_request_sent : user_id} }
                ).exec((err) => {
                    if(err){callback(1, err)}
                    else{callback(0, 'success')}
                })
            }
        })
    }


}

const friendDelete = function(user_id, friend_id, callback){
    User.updateOne(
        {_id : user_id},
        { $pull : {friend_list : friend_id} }
    ).exec((err) => {
        if(err){callback(1, err)}
        else{
            User.updateOne(
                {_id : friend_id},
                { $pull : {friend_list : user_id} }
            ).exec((err) => {
                if(err){callback(1, err)}
                else{callback(0, 'success')}
            })
        }
    })
}



module.exports = {
    friendRequest : friendRequest,
    friendRespond : friendRespond,
    friendDelete : friendDelete
}