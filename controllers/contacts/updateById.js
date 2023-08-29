const { contactModel, schema } = require('../../models/contactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const updateById = asyncHandler(async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400);
        throw HttpError(400, 'Provide all fields data');
    }
    const result = await contactModel.findByIdAndUpdate(
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
