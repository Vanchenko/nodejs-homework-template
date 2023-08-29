const contactsRoutes = require('express').Router();
const contactController = require('../controllers/index.js');
const isValidId = require("../middlewares/isValidId");

contactsRoutes.get('/contacts', contactController.contacts.getAll);
contactsRoutes.get('/contacts/:contactId', isValidId, contactController.contacts.getById);
contactsRoutes.post('/contacts', contactController.contacts.add);
contactsRoutes.delete('/contacts/:contactId', isValidId, contactController.contacts.deleteById);
contactsRoutes.put('/contacts/:contactId', isValidId, contactController.contacts.updateById);
contactsRoutes.patch('/contacts/:contactId/favorite', isValidId, contactController.contacts.updateStatusContact);

module.exports = contactsRoutes;