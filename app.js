/* names : inkStudies inklassic*/

var express = require('express')
var app = express();
var routes = require('./routes/routes.js')
var middleware = require('./middlewares/middleware.js')

app.use('/util', express.static('util'))
app.use('/navigation', express.static('navigation'))
app.use('/public', express.static('public'))
app.use(express.json());

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

//views
app.engine('pug', require('pug').__express)

app.set('view engine', 'pug');
app.set('views','./views');

//middlewares
//app.use('/', middleware)

//routes
app.use('/', routes)

//main app
var server = app.listen(8081, function(){
  connection.getConnection(function(err, connection){
    if(err){
      console.error("couldn't connect to DB" + err)
    }else{
      console.log("connection established successfully")
    }
  })
  var port = server.address().port;
  console.log('app listening at port ' + port)
})
