const usersRoutes = require('express').Router();
const { authenticate } = require('../middlewares');
const userControllers = require('../controllers/index.js');

usersRoutes.post('/register', userControllers.users.register); 
usersRoutes.post('/login', userControllers.users.login);
usersRoutes.get('/current', authenticate, userControllers.users.getCurrent);
usersRoutes.get('/logout', authenticate, userControllers.users.logout);
usersRoutes.patch('/', authenticate, userControllers.users.updateSubscription);

module.exports = usersRoutes;