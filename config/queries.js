const User = require('../models/User');
const Book = require('../models/Book');
const List = require('../models/List')

//POPULATE : https://mongoosejs.com/docs/populate.html#query-conditions

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

// -------------- BOOKS -------------------

const getBooksFromUser = function(user_id, callback){
    Book.find(
        { userId : user_id},
        'title author release_year _id',
        {sort : {author : 1}},
        (err, books) => {
            if(err){callback(1, err)}
            else{callback(0, books)}
        }
    )
}

const getBookFromUser = function(book_id, callback){
    Book.find(
        { _id : book_id},
        'title author release_year creation_date last_modif notes',
        (err, book) => {
            if(err){callback(1, err)}
            else{callback(0, book)}
        }
    )
}

const addBookFromUser = function(data, callback){
    const book = new Book({
        'userId' : data.userId,
        'title' : data.body.title,
        'author' : data.body.author,
        'release_year' : data.body.release_year
    })
    book.save((err) => {
        if(err){callback(1, err)}
        else{callback(0, 'success')}
    })
}

const delBookFromUser = function(book_id, callback){
    Book.deleteOne(
        { '_id' : book_id},
        (err) => {
            if(err){callback(1, err)}
            else{callback(0, 'success')}
        }
    )
}

const modifBookFromUser = function(book, book_id, callback){
    Book.updateOne(
        {'_id' : book_id},
        {'$set' : {
            'title' : book['title'],
            'author' : book['author'],
            'release_year' : book['release_year'],
            'notes' : book['notes'],
            'last_modif' : Date.now()
        }},
        (err) => {
            if(err){callback(1, err)}
            else{callback(0, 'success')}
        }
    )
}

// -------------- LISTS -------------------


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
    users : {
        getUserById : getUserById,
        addFriend : addFriend
    },
    books : {
        getBookFromUser : getBookFromUser,
        getBooksFromUser : getBooksFromUser,
        addBookFromUSer : addBookFromUser,
        delBookFromUser : delBookFromUser,
        modifBookFromUser : modifBookFromUser
    },
    lists : {
        getListInfoFromUser : getListInfoFromUser
    }
}


