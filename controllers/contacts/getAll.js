const ContactModel = require('../../models/ContactModel');
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
    const contacts = await ContactModel.find({});
    res.status(200).json({
        code: 200,
        message: 'success',
        quantity: contacts.length,
        data: contacts
    });
});

module.exports = getAll;