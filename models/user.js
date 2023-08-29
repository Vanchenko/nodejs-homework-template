const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require("../helpers/handleMongooseError");


const userSchema = new Schema(
    {
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
});

const userModel = model("user", userSchema);
// console.log(userSchema);
module.exports = {
    userModel,
    registerSchema,
    loginSchema,
    subscriptionSchema,
};