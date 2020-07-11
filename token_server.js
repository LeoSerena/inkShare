require('dotenv').config()

var express = require('express');
const jwt = require('jsonwebtoken')
var app = express();

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.cookies['refresh-token']
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({
            _id: user._id,
            username : user.username
        })
        res.json({ accessToken : accessToken })
    })
})


app.post('/login', async function(req, res){
    const { error } = userLoginSchema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }else{
        const user = await User.findOne({
            //can either give username or email
            $or: [
                { email : req.body.credentials },
                { username : req.body.credentials }
            ]
        })
        if(!user) return res.status(400).send('username or password incorrect')
    
        const isValid = await bcrypt.compare(req.body.password, user.password)

        if(!isValid){
            return res.status(400).send('username or password incorrect')
        }else{
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.cookie('auth-token', accessToken, {maxAge : 100000}).cookie('refresh-token', refreshToken, {maxAge : 100000})
        }
    }


})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token === req.cookies['refresh-token'])
    res.sendStatus(204)
})


var server = app.listen(8082, function(){
    var port = server.address().port;
    console.log('app listening at port ' + port)
})

function generateAccessToken(json){
    return jwt.sign(json, process.env.TOKEN_SECRET, {expiresIn : '15s'})
}