const { User } = require('../../models');
const { HttpError, sendEmail } = require("../../helpers");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "User not found");
    };
    if (user.verify) {
        throw HttpError(401, "Email already verify");
    };
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({ message: "Verify email send success" });
};

module.exports = resendVerifyEmail;
