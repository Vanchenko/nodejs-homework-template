const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { userModel } = require("../models/user");
const { HttpError }  = require("../helpers");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = asyncHandler( async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401);
        throw HttpError(401, "Not authorized");
    }
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") { next(HttpError(401, "Not authorized")) }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await userModel.findById(id);
        if (!user) { throw HttpError(401, "Not authorized") };
        req.user = user; 
        next();
    } catch {
        next(HttpError(401, "Not authorized"));
    }
});

module.exports = authenticate;