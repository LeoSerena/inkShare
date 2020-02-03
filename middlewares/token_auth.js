const jwt = require('jsonwebtoken');

var authenticate = function(req, res, next){

    const cookies = req.cookies;
    token = cookies['auth-token']
    if(!token) return res.status(400).send('access denied without identification')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userId = verified
    }catch(err){
        res.status(400).send('The given token is invalid')
    }
    next()
}

module.exports = authenticate;