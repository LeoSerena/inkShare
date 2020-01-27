/* names : inkStudies inklassic*/

var express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
var app = module.exports = express();

app.use(express.static('routes'))
app.use(express.static('util'))
app.use(express.static('navigation'))
app.use(express.static('models'))
app.use(express.static('public'))
app.use(express.static('middlewares'))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');

var connection = mysql.createPool({
    conenctionLimit : 10,
    host : "192.168.1.113",
    port : '3306',
    user : "laptop",
    password : "pass",
    database : "inkShareDB",
    debug : false
});

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

global.app = app;
global.connection = connection;

// routing
//gets the index page
app.get('/index', function(req, res){
  res.sendFile(path.join(__dirname, 'routes', 'index.html'))
})
app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, 'routes', 'index.html'))
})
app.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname, 'user', 'signup'))
})
//get the error page by default if none is found
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'routes','404.html'))
})

