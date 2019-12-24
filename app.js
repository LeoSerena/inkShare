/* names : inkStudies inklassic*/

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('util'))
app.use(express.static('navigation'))
app.use(express.static('models'))
app.use(express.static('public'))

app.use(express.json());


//gets the index page
app.get('/index', function(req, res){
    res.sendFile(path.resolve(__dirname + '/index.html'))
})
//get the error page by default if none is found
app.get('/*', function(rew, res){
    res.sendFile(path.resolve(__dirname + '/views/404.html'))
})

//main app
var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log('app listening at port ' + port)
})

