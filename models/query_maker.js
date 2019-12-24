var mysql = require('mysql');

var connection = mysql.createConnection({
    host : "localhost",
    port : '3306',
    user : "root",
    password : "password",
    database : "inkShareDB"
});

var sql = "SELECT * FROM users"


connection.connect(function(err){
    if(err) throw err;
    console.log("established conenction");
    connection.query(
        sql,
        function(err, result){
            if(err) throw err;
            console.log(result);
        }
    )
});

