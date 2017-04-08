import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Logger from './lib/logger';
require('dotenv').config();

import routes from './routes';
import Constants from './config/constants';

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Enable CORS with various options
app.use(cors());
app.set('views', path.join(__dirname, 'views'));

// Request logger (TURNED OFF TEMPORARILY)
// if (!Constants.envs.test) {
// app.use(morgan('dev'));
// }

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: 'smith' }));

// Lets you use HTTP verbs such as PUT or DELETE
app.use(methodOverride());

// Mount public routes
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use(Constants.apiPrefix, routes);

// Database Connection Verification
// Constants.connections.connect(function (err) {
//   if (err) {
//     Logger.error('Error connecting to database!'); return;
//   }
//   Logger.debug(`Connected to database @ ${process.env.DB_HOST}!`);
// });

app.listen(Constants.port, () => {
  Logger.debug(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
