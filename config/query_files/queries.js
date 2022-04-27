
//POPULATE : https://mongoosejs.com/docs/populate.html#query-conditions

const user_queries = require('./users')
const friend_queries = require('./friends')
const book_queries = require('./books')
const list_queries = require('./lists')

module.exports = {
    users : user_queries,
    friends : friend_queries,
    books : book_queries,
    lists : list_queries
}


