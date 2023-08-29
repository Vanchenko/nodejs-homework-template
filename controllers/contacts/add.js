const { contactModel, schema } = require('../../models/contactModel');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const add = asyncHandler(async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400);
        throw HttpError(400, 'Provide all fields data');
    }
    const { _id } = req.user;
    const result = await contactModel.create({ ...req.body, owner: _id });
    res.status(201).json({
        code: 201,
        message: 'success',
        data: result,
    });
});

module.exports = add;
