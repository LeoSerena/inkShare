var express = require('express')
var app = express();

var server = app.listen(8082, function(){
    var port = server.address().port;
    console.log('app listening at port ' + port)
  })