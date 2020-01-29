/* names : inkStudies inklassic*/

var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var routes = require('./routes/routes.js')
var test_route = require('./routes/test_routes.js')

var middleware = require('./middlewares/middleware.js')

app.use('/util', express.static('util'))
app.use('/navigation', express.static('navigation'))
app.use('/public', express.static('public'))
app.use(express.json());

//views
app.engine('pug', require('pug').__express)

app.set('view engine', 'pug');
app.set('views','./views');

//middlewares
//app.use('/', middleware)



//form & body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

//routes
app.use('/test', test_route);
app.use('/', routes);

//main app
var server = app.listen(8081, function(){
  var port = server.address().port;
  console.log('app listening at port ' + port)
})
