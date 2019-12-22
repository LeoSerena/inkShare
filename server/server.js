/* names : inkStudies inklassic*/

var express = require('express');

var app = express();
app.use(express.json());
app.use(express.static('lib'));



app.get('/index', function(req, res){
    res.sendFile(__dirname + '/html/index.html')
})

var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log('app listening at port ' + port)

})
