const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;
const TOKEN_EXPIRATION_TIME = "23h";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION_TIME });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

module.exports = login;