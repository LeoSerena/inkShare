

// routing
//gets the index page
app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'))
  })
  //get the error page by default if none is found
  app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'views','404.html'))
  })