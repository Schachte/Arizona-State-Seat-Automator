import { Router } from 'express';

import MetaController from './controllers/meta.controller';
import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import ClassController from './controllers/class.controller';

import ClassAPI from './api/classes.api';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);
routes.get('/dashboard', HomeController.index);
routes.get('/settings', HomeController.settings);

//Classes
routes.get('/class/:classNumber', ClassController.getClassName);

routes.get('/classes/', ClassAPI.getClasses);
routes.post('/classes/', ClassAPI.addClass);

// Admin
routes.get('/admin', accessControl('admin'), MetaController.index);
routes.use(errorHandler);

export default routes;
