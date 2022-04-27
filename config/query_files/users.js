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
        'username email friend_list friend_request_sent friend_request_pending' //picture
    ).populate({
        path : 'friend_list',
        select : 'username'
    }).populate({
        path : 'friend_request_sent',
        select : 'username'
    }).populate({
        path : 'friend_request_pending',
        select : 'username'
    }).exec(
        (err, user) => {
            if(err||(user_id!=user._id)){callback(1, err)}
            else{callback(0, user)}
        }
    )
}

module.exports = {
    getUserById : getUserById
}