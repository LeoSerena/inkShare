var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit : 10,
    host : "192.168.1.113",
    port : '3306',
    user : "laptop",
    password : "pass",
    database : "inkShareDB",
    debug : false
});

var getConnection = connection.getConnection(function(err, connection){
    if(err){
      console.error("couldn't connect to DB" + err)
    }else{
      console.log("connection established successfully")
    }
})

module.exports = getConnection