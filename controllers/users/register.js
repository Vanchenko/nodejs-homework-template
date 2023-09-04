const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { userModel, registerSchema }  = require('../../models/user');
const { HttpError, sendEmail } = require("../../helpers");
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { BASEURL_VERIFYEMAIL } = process.env;


const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
        error.status = 400;
        throw error;
    }
    const user = await userModel.findOne({ email });

    if (user) {
        throw HttpError(409, "Email already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();
    const newUser = await userModel.create({ name, email, password: hashPassword, avatarURL, verificationCode });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASEURL_VERIFYEMAIL}/users/verify/${verificationCode}">Click verify email</a>`
    }
    await sendEmail(verifyEmail);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
});

module.exports = register;