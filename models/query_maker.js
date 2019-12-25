var mysql = require('mysql');

var connection = mysql.createConnection({
    host : "192.168.1.113",
    port : '3306',
    user : "laptop",
    password : "pass",
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

