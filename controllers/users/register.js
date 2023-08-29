const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { userModel, registerSchema }  = require('../../models/user');
const { HttpError } = require("../../helpers");

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
    const newUser = await userModel.create({ name, email, password: hashPassword });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
});

module.exports = register;