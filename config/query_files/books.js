const Book = require('../../models/Book');


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

module.exports = {
    getBookFromUser : getBookFromUser,
    getBooksFromUser : getBooksFromUser,
    addBookFromUSer : addBookFromUser,
    delBookFromUser : delBookFromUser,
    modifBookFromUser : modifBookFromUser
}