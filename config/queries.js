const User = require('../models/User');
const Book = require('../models/Book');


/**
 * Fetches the lists, firends and books for the given user
 * to be displayed on the private page
 * @param {The user id to fetch the information for} user_id 
 */
var getUserById = async function(user_id){
    User.findOne(
        { userId : user_id },
        'username email friend_list my_lists fav_lists' //picture
    ).populate('friend_list my_lists').exec(
        (err, user) => {
            if(err){console.log(err)}
            Book.find(
                { userId : user_id},
                'title author release_year creation_date _id',
                {sort : {author : 1}},
                (err, books) => {
                    if(err){console.log(err)}
                    res.send({
                        user : user,
                        books : books
                    })
                }
            )
        }
    )
}

var getBooksFromUser = async function(user_id){
    Book.find(
        { userId : user_id},
        'title author release_year creation_date _id',
        {sort : {author : 1}},
        (err, books) => {
            if(err){console.log(err)}
            return books
        }
    )
}

var getlistsFromUser = async function(user_id){
    User.findOne(
        { userId : user_id },
        'my_lists fav_lists'
    ).populate('friend_list my_lists').exec(
        (err, lists) => {
            if(err){console.log(err)}
            return lists
        }
    )
}



