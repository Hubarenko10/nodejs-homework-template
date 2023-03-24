const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
require("dotenv").config();

const { SECRET_KEY } = process.env;
const TOKEN_EXPIRATION_TIME = "23h";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      throw HttpError(400, "Email and password are required");
    }

 
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

   
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw HttpError(401, "Email or password is wrong");
    }

   
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION_TIME });

   
    await User.findByIdAndUpdate(user._id, { token });

   
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = login;