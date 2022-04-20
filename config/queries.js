const User = require('../models/User');
const Book = require('../models/Book');
const List = require('../models/List')


/**
 * Fetches the lists, firends and books for the given user
 * to be displayed on the private page
 * @param {The user id to fetch the information for} user_id
 * @param {The callback function that does something with the result} callback
 */
const getUserById = function(user_id, callback){
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
                    if(err){callback(1, err)}
                    callback(0, {
                        user : user,
                        books : books
                    })
                }
            )
        }
    )
}

// -------------- BOOKS -------------------

const getBooksFromUser = function(user_id, callback){
    Book.find(
        { userId : user_id},
        'title author release_year creation_date _id',
        {sort : {author : 1}},
        (err, books) => {
            if(err){callback(1, err)}
            else{callback(0, books)}
        }
    )
}

const addBookFromUser = async function(data, callback){
    const { error } = await bookAddValidation.validate(data)
    if(error){console.log(error.details[0].message)}
    else{
        const book = new Book({
            'userId' : data.userId,
            'title' : data.body.title,
            'author' : data.body.author,
            'release_year' : data.body.release_year
        })
        book.save((err) => {
            if(err){callback(1, err)}
            else{callback(0, 'Book saved successfully')}
        })
    }
}

const delBookFromUser = function(book_id, callback){
    Book.deleteOne(
        { 'id_' : book_id},
        (err) => {
            if(err){callback(1, err)}
            else{callback(0, 'Book deleted successfully')}
        }
    )
}

const modifBookFromUser = async function(data, callback){
    const { error } = await bookAddValidation.validate(data)
    if(error){console.log(error.details[0].message)}
    Book.updateOne(
        {'id_' : data.book_id},
        {'$set' : {
            'title' : data.body['title'],
            'author' : data.body['author'],
            'release_year' : data.body['release_year'],
            'notes' : data.body['notes'],
            'last_modif' : Date.now()
        }},
        (err) => {
            if(err){callback(1, err)}
            else{callback(0, 'Book modified successfully')}
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
        getUserById : getUserById
    },
    books : {
        getBooksFromUser : getBooksFromUser,
        addBookFromUSer : addBookFromUser,
        delBookFromUser : delBookFromUser,
        modifBookFromUser : modifBookFromUser
    },
    lists : {
        getListInfoFromUser : getListInfoFromUser
    }
}


