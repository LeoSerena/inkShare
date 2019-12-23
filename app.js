/* names : inkStudies inklassic*/

var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('util'))
var appDir = path.dirname(require.main.filename);
app.use(express.json());



app.get('/index', function(req, res){
    res.sendFile(path.resolve(__dirname + '/index.html'))
})

var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log('app listening at port ' + port)
    console.log('root path: ' + appDir)
})
