const { contactModel } = require('../../models/contactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const deleteById = asyncHandler(async (req, res) => {
    const result = await contactModel.findByIdAndRemove(req.params.contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({
        code: 200,
        message: 'success',
        data: result,
    })
});

module.exports = deleteById;