const contactsRoutes = require('express').Router();
const contactController = require('../controllers/index.js');
const { authenticate } = require('../middlewares');
const isValidId = require("../middlewares/isValidId");

contactsRoutes.get('/contacts', authenticate, contactController.contacts.getAll);
contactsRoutes.get('/contacts/:contactId', authenticate, isValidId, contactController.contacts.getById);
contactsRoutes.post('/contacts', authenticate, contactController.contacts.add);
contactsRoutes.delete('/contacts/:contactId', authenticate, isValidId, contactController.contacts.deleteById);
contactsRoutes.put('/contacts/:contactId', authenticate, isValidId, contactController.contacts.updateById);
contactsRoutes.patch('/contacts/:contactId/favorite', authenticate, isValidId, contactController.contacts.updateStatusContact);

module.exports = contactsRoutes;