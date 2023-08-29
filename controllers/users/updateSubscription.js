const { userModel, subscriptionSchema } = require('../../models/user');
const asyncHandler = require("express-async-handler");
const { HttpError } = require('../../helpers');

const updateSubscription = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const { error } = subscriptionSchema.validate(req.body);
    if (error) {
        error.message = "Wrong subscription field";
        error.status = 400;
        throw error;
    }
  
    const result = await userModel.findByIdAndUpdate(
        _id,
         req.body,
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

module.exports = updateSubscription;