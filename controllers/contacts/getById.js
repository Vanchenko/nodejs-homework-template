const { contactModel } = require('../../models/contactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const getById = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.contactId);
    if (!contact) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({
        code: 200,
        message: 'success',
        data: contact,
    });
});

module.exports = getById;