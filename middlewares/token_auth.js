
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

const refresh = function(req, res, next){
    if(req.cookies['refresh-token']){
        const refresh_token = req.cookies['refresh-token']
        jwt.verify(
            refresh_token, process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if(err){return res.status(400).send('Unauthorized')}
                const access_token = jwt.sign({
                        _id : req.userId,
                        username : req.username,
                        ait : Date.now()
                    },
                    process.env.TOKEN_SECRET, 
                    { expiresIn : '20m' }
                )
                res.cookie('auth-token', access_token, {maxAge : 20 * 60 * 1000})
            }
        )
    }
    next()
}

module.exports = {
    authenticate : authenticate,
    refresh : refresh
};