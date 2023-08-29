const ContactModel = require('../../models/ContactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const add = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw HttpError(400, 'Provide all fields data');
    }
    const { _id } = req.user;
    const result = await ContactModel.create({ ...req.body, owner: _id });
    res.status(201).json({
        code: 201,
        message: 'success',
        data: result,
    });
});

module.exports = add;
