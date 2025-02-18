const jwt = require("jsonwebtoken");
require("dotenv").config();
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) { 
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;