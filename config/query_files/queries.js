
//POPULATE : https://mongoosejs.com/docs/populate.html#query-conditions

const user_queries = require('./users')
const friend_queries = require('./friends')
const book_queries = require('./books')
const list_queries = require('./lists')

const callback = function (failure, result, res){
    if(failure){
        console.log(result)
        res.send(result)
    }else{
        res.send(result)
    }
}

module.exports = {
    users : user_queries,
    friends : friend_queries,
    books : book_queries,
    lists : list_queries,
    callback : callback
}


