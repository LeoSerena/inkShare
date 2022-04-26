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

const bookSchema = Joi.object({
    title : Joi.string()
        .max(1024)
        .required(),
    author : Joi.string()
        .required()
        .max(1024),
    release_year : Joi.number()
        .integer()
        .max(9999)
        .min(0),
    notes : Joi.string()
        .max(9999)
})

const listSchema = Joi.object({
    original_creator : Joi.string()
                            .min(5)
                            .max(255)
                            .alphanum()
                            .required(),
    name : Joi.string()
            .min(1)
            .max(255)
            .required()
})


module.exports = {
    'userRegisterationValidation' : userSchema,
    'userLoginValidation' : loginSchema,
    'bookAddValidation' : bookSchema,
    'listAddValidation' : listSchema
}