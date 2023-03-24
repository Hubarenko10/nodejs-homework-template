const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const add = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

module.exports = add;