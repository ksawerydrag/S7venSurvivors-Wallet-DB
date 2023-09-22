const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const Joi = require("joi");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate(value) {
                const re = /\S+@\S+.\S+/;
                return re.test(String(value).toLowerCase());
            },
        },
        token: {
            type: String,
            default: null,
        },
    }, 
    { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function(password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
};

const joiSignupSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    token: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const User = mongoose.model("user", userSchema);

module.exports = {
    User,
    joiLoginSchema,
    joiSignupSchema,
};