var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser')
var connect = require('./config/mongoDB')

var test_route = require('./routes/test_route')

var public_route = require('./routes/public_route');
var private_route = require('./routes/private_route');

app.use('/util', express.static('util'))
app.use('/navigation', express.static('navigation'))
app.use('/public', express.static('public'))
app.use('/css', express.static('css'))
app.use(express.json());

//views
app.engine('pug', require('pug').__express)

app.set('view engine', 'pug');
app.set('views','./views');

//form & body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(upload.array());

//cookies
app.use(cookieParser());

app.use('/', public_route);
app.use('/private', private_route);
app.use('/testing', test_route);
app.get('/*', function(req, res){
    res.render('404')
})
//main app
var server = app.listen(8081, function(){
    var port = server.address().port;
    connect()
    console.log('app listening at port ' + port)
  })