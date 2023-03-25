const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const SALT_ROUNDS = 10;

const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const avatarURL = gravatar.url(email); 

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
};

module.exports = register;