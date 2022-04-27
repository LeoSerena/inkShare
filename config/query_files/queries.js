
//POPULATE : https://mongoosejs.com/docs/populate.html#query-conditions

const user_queries = require('./users')
const book_queries = require('./books')
const list_queries = require('./lists')

module.exports = {
    users : user_queries,
    books : book_queries,
    lists : list_queries
}


