const Joi = require('joi');

const dataSchema = Joi.object({
    name: Joi.string().max(30).required().error(new Error("missing required name field")),
    email: Joi.string().max(40).required().error(new Error("missing required email field")),
    phone: Joi.string().max(18).required().error(new Error("missing required phone field"))
})

module.exports = {
    dataSchema,
}