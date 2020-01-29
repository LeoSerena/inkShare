var middleware = function(req, res, next){
    console.log("new request at " + Date.now());
    next();
}

module.exports = middleware;