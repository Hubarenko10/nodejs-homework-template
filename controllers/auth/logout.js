const { User } = require('../../models');

const TOKEN_EMPTY_VALUE = "";

const logout = async (req, res,next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: TOKEN_EMPTY_VALUE });
    res.json({ message: "Logout success" });
  } catch (err) {
    next(err);
  }
};

module.exports = logout;