var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "inkShareDB"
});

var sql = "SELECT * FROM users"


con.connect(function(err){
    if(err) throw err;
    console.log("established conenction");
    con.query(
        sql,
        function(err, result){
            if(err) throw err;
            console.log(result);
        }
    )
});

