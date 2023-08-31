const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { userModel } = require("../models/user");
const { HttpError }  = require("../helpers");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = asyncHandler( async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
        res.status(401);
        next(HttpError(401, "Not authorized"));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await userModel.findById(id);
        if (!user || !user.token || user.token !== token) {
            res.status(401);
            next(HttpError(401, "Not authorized"))
        };
         req.user = user; 
        next();
    } catch (error) {
        console.error(error);
        res.status(401);
        next(HttpError(401, "Not authorized"));
    }
});

module.exports = authenticate;