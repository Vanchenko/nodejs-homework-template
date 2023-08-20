const ContactModel = require('../../models/ContactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const updateStatusContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;
    const result = await ContactModel.findByIdAndUpdate(
        contactId,
        { ...req.body },
        { new: true }
    );
    if (!Object.keys(req.body).includes('favorite')) {
        throw HttpError(400, 'missing field favorite');
    }
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({
        code: 200,
        message: 'success',
        data: result,
    });
});

module.exports = updateStatusContact;