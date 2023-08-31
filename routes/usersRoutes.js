const usersRoutes = require('express').Router();
const { authenticate, validateBody, upload } = require('../middlewares');
const { registerSchema } = require('../models/user');
const userControllers = require('../controllers/index.js');

usersRoutes.post('/register', validateBody(registerSchema), userControllers.users.register); 
usersRoutes.post('/login', userControllers.users.login);
usersRoutes.get('/current', authenticate, userControllers.users.getCurrent);
usersRoutes.get('/logout', authenticate, userControllers.users.logout);
usersRoutes.patch('/', authenticate, userControllers.users.updateSubscription);
usersRoutes.patch('/avatars', authenticate, upload.single('avatar'), userControllers.users.updateAvatar);

module.exports = usersRoutes;