const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteById = async (req, res, next) => {
const { contactId } = req.params;
const result = await Contact.findByIdAndRemove(contactId);
if (!result) {
throw HttpError(404, 'Contact not found');
}
res.json({ message: 'Contact deleted' });
};

module.exports = deleteById;