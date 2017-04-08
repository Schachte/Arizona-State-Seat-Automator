import { Router } from 'express';

import MetaController from './controllers/meta.controller';
import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import RegistrationController from './controllers/registration.controller';
import ClassController from './controllers/class.controller';

import ClassAPI from './api/classes.api';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/signup', RegistrationController.index);
routes.get('/', MetaController.index);
routes.get('/dashboard', HomeController.index);
routes.get('/settings', HomeController.settings);

// Authentication
routes.post('/auth/login', AuthController.login);
routes.get('/auth/logout', AuthController.logout);

// Users
routes.get('/users', UsersController.search);
routes.post('/users', UsersController.create);
routes.get('/users/me', authenticate, UsersController.fetch);
routes.put('/users/me', authenticate, UsersController.update);
routes.delete('/users/me', authenticate, UsersController.delete);
routes.get('/users/:username', UsersController._populate, UsersController.fetch);

// Classes
routes.get('/class/:classNumber', ClassController.getClassName);

routes.get('/classes/', ClassAPI.getClasses);

// Admin
routes.get('/admin', accessControl('admin'), MetaController.index);
routes.use(errorHandler);

export default routes;
