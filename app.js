/* names : inkStudies inklassic*/

var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('util'))
app.use(express.json());



app.get('/index', function(req, res){
    res.sendFile(path.resolve(__dirname + '/index.html'))
})

app.get('/*', function(rew, res){
    res.sendFile(path.resolve(__dirname + '/404.html'))
})

var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log('app listening at port ' + port)
})

