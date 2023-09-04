const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { userModel }  = require('../../models/user');
const { HttpError } = require("../../helpers");

const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationCode } = req.params;
    const user = await userModel.findOne({ verificationCode });
    if (!user) {
        throw HttpError(401, "Email not found")
    }
    await userModel.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" });

    res.json({
        message: "Email verify success"
    })
});

module.exports = verifyEmail;