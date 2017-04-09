import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './configuration/store';

// Bootstrap Base
import 'bootstrap/dist/css/bootstrap.css';

// Icons
import 'font-awesome/css/font-awesome.css';

// Ryan Template Base
import '../public/css/template/styles.css';

// Custom CSS
import '../public/css/index.css';


// Template Base
// import '../public/css/template.css';
// Styles
// import '../public/css/index.css';

const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>
      , rootElement);
  });
}
