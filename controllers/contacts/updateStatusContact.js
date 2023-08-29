const { contactModel, schemaFavorite } = require('../../models/contactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const updateStatusContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;
    const { error } = schemaFavorite.validate(req.body);
    if (error) {
        res.status(400);
        throw HttpError(400, 'missing field favorite');
    }
    const result = await contactModel.findByIdAndUpdate(
        contactId,
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

module.exports = updateStatusContact;