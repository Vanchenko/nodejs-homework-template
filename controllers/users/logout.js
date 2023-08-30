const asyncHandler = require("express-async-handler");
const { userModel } = require('../../models/user');

const logout = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    await userModel.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
});

module.exports = logout;