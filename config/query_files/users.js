const User = require('../../models/User');

/**
 * Fetches the lists, firends and books for the given user
 * to be displayed on the private page
 * @param {The user id to fetch the information for} user_id
 * @param {The callback function that does something with the result} callback
 */
 const getUserById = function(user_id, callback){
    User.findOne(
        { _id : user_id },
        'username email friend_list' //picture
    ).populate({
        path : 'friend_list',
        select : 'username'
    }).exec(
        (err, user) => {
            if(err||(user_id!=user._id)){callback(1, err)}
            else{callback(0, user)}
        }
    )
}

const addFriend = function(user_id, friend_credential, callback){
    User.findOne(
        {$or : [
            { username : friend_credential},
            { email : friend_credential}
        ]},
        '_id username email'
    ).exec((err, friend) => {
        console.log(friend)
        if(err||(friend.username!=friend_credential && friend.email!=friend_credential)){
            callback(1, err)
        }else{
            if(friend._id && (friend._id != user_id)){
                User.findOneAndUpdate(
                    {_id : user_id},
                    { $push : {friend_list : friend._id}}
                ).exec((err) => {
                    if(err){callback(1, err)}
                    else{callback(0, 'success')}
                })
            }else{
                callback(1, 'The given username or email was not found')
            }
        }
    })

}


module.exports = {
    getUserById : getUserById,
    addFriend : addFriend
}