import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import { renderInput } from '../../common/ReduxFormComponents';

function onSubmit(values) {
  this.props.login();
  this.props.history.push('/')
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = onSubmit.bind(this);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="login-wrapper">
            <div className="box">
              <div className="content-wrap">
                <h6>Sign In</h6>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <Field name="email" type="text" component={renderInput} label="E-mail address" />
                  <Field name="password" type="password" component={renderInput} label="Password" />
                  <button className="btn btn-primary signup">Login</button>
                </form>
              </div>
            </div>

            <div className="already">
              <p>Don't have an account yet?</p>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {

  let errors = {};
  if (!values.get('email')) {
    errors.email = 'Email required';
  }

  if (!values.get('password')) {
    errors.password = 'Password required';
  }

  return errors;
}

export default reduxForm({
  form: 'login',
  validate
})(Login);
