
const jwt = require('jsonwebtoken');

const authenticate = function(req, res, next){

    const token = req.cookies['auth-token'];
    if(!token){ 
        req.userId = null;
        next()
    }else{
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            if ((Date.now() - verified['ait']) / 60000 > 30) return res.status(400).send('the token is no longer valid, please relogin')
            req.userId = verified['_id']
            req.username = verified['username']
        }catch(err){
            res.status(400).send('The given token is invalid')
        }
        next()
    }
}

module.exports = authenticate;