const Joi = require('@hapi/joi')


//User registeration validation
const userSchema = Joi.object({
    username : Joi.string()
        .min(5)
        .max(255)
        .alphanum()
        .required(),
    email : Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')),
    passwordConfirm : Joi.ref('password')
})

//User login validation
const loginSchema = Joi.object({
    credentials : [
        //username
        Joi.string()
            .min(5)
            .max(255)
            .alphanum()
            .required(),
        //or email
        Joi.string()
            .required()
            .email()
    ],
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$'))
})

module.exports = {
    'userRegisterationValidation' : userSchema,
    'userLoginValidation' : loginSchema
}