const User = require('../models/User');
const Book = require('../models/Book');
const List = require('../models/List')


/**
 * Fetches the lists, firends and books for the given user
 * to be displayed on the private page
 * @param {The user id to fetch the information for} user_id
 * @param {The callback function that does something with the result} callback
 */
var getUserById = function(user_id, callback){
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
                    callback({
                        user : user,
                        books : books
                    })
                }
            )
        }
    )
}

var getBooksFromUser = function(user_id, callback){
    Book.find(
        { userId : user_id},
        'title author release_year creation_date _id',
        {sort : {author : 1}},
        (err, books) => {
            if(err){console.log(err)}
            callback(books)
        }
    )
}

var getListInfoFromUser = async function(user_id, callback){
    List.find(
        { original_creator : user_id },
        'creation_date last_modification name size',
        {sort : {last_modification : 1}},
        (err, lists) => {
            if(err){console.log(err)}
            callback(lists)
        }
    )
}

module.exports = {
    getUserById : getUserById,
    getBooksFromUser : getBooksFromUser,
    getListInfoFromUser : getListInfoFromUser
}


