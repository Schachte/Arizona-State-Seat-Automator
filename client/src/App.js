import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';

import Login from './auth/containers/LoginContainer';
import Register from './auth/containers/RegisterContainer';
import Home from './Dashboard/components/Home';

import { loggedIn } from './common/helper';

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => {
    if (loggedIn()) {
      return React.createElement(component, props)
    } else {
      return <Redirect to="/login" />
    }
  }} />
);

// If you want a component to rerender based on routes, with RR4, you must wrap it with withRouter.
const Header = withRouter(() => (
  <div className="header">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="logo pull-left" style={{ marginLeft: '60px' }}>
            <h1><Link to="/">ASU OpenSeat</Link></h1>
          </div>
          {loggedIn()
            ? <div className="pull-right"><h3><Link to="logout">Logout</Link></h3></div>
            : null
          }
        </div>
      </div>
    </div>
  </div>
));

const Footer = withRouter(() => {

  if (loggedIn()) {
    return (
      <footer>
        <div className="container">

          <div className="copy text-center">
            Copyright 2017 <a href='#'>asuopenseat.com</a>
          </div>

        </div>
      </footer>
    )
  } else {
    return null;
  }
});

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Header />


          <div className="page-content container-fluid">

            <Switch>

              {/*Auth Routes*/}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Register} />
              <Route path="/logout" render={() => {
                delete localStorage.loggedIn;
                return <Redirect to="/login" />
              }} />

              <PrivateRoute path="/" component={Home} />

            </Switch>

          </div>

          {/* Show Footer when Logged In*/}
          <Footer />

        </div>
      </Router>
    );
  }
}

/*<section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-12">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route path="/logout" render={() => {
                    delete localStorage.loggedIn;
                    return <Redirect to="/login" />
                  }} />

                  <Route path="/login" render={(props) => {

                    return <Login {...props} />;
                  }} />

                  <Route path="/equipment" component={Equipment} />
                  <Route render={() => <h2>404</h2>} />
                </Switch>
              </div>
            </div>
          </section>
        </section>*/

export default App;
