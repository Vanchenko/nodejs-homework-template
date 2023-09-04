const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { userModel }  = require('../../models/user');
const { HttpError, sendEmail } = require("../../helpers");

const { BASEURL_VERIFYEMAIL } = process.env;

const resendVerifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email not found");
    }
    if (user.verify) {
        throw HttpError(401, "Email already verify");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASEURL_VERIFYEMAIL}/users/verify/${user.verificationCode}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email send success"
    })
});

module.exports = resendVerifyEmail;