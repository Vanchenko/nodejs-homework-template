const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { userModel } = require('../../models/user');
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id,
    };

    console.log('SecrKey', SECRET_KEY);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await userModel.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
});

module.exports = login;