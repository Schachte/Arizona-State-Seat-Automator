import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var exphbs  = require('express-handlebars');

import routes from './routes';
import Constants from './config/constants';

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.set('layout','layout');


app.engine('.hbs', exphbs({ defaultLayout: 'dashboard', extname: '.hbs', layoutsDir: path.join(__dirname, 'views')}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Request logger
// https://github.com/expressjs/morgan
if (!Constants.envs.test) {
  app.use(morgan('dev'));
}

// Parse incoming request bodies
// https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: 'smith'}));

// Lets you use HTTP verbs such as PUT or DELETE
// https://github.com/expressjs/method-override
app.use(methodOverride());

// Mount public routes
// app.use('/public', express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use(Constants.apiPrefix, routes);

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
