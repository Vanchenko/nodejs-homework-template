const ContactModel = require('../../models/ContactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const updateById = asyncHandler(async (req, res) => {
    const result = await ContactModel.findByIdAndUpdate(
        req.params.contactId,
        { ...req.body },
        { new: true }
    );
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({
        code: 200,
        message: 'success',
        data: result,
    });
});

module.exports = updateById;
