const { contactModel } = require('../../models/contactModel');
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    const getByCondition = { owner: _id };
    if (favorite === "true") {
        getByCondition.favorite = true;
    }
    if (favorite === "false") {
        getByCondition.favorite = false;
    }
    const contacts = await contactModel.find(getByCondition, "", {
        skip,
        limit,
    });
    res.status(200).json({
        code: 200,
        message: 'success',
        quantity: contacts.length,
        data: contacts
    });
});

module.exports = getAll;