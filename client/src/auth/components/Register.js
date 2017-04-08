import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import { renderInput } from '../../common/ReduxFormComponents';

function onSubmit(values) {
  this.props.register();
  this.props.history.push('/')
}

class Register extends Component {
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
                <h6>Sign Up</h6>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <Field name="email" type="text" component={renderInput} label="E-mail address" />
                  <Field name="password" type="password" component={renderInput} label="Password" />
                  <Field name="confirm_password" type="password" component={renderInput} label="Confirm Password" />
                  <button className="btn btn-primary signup">Sign Up</button>
                </form>
              </div>
            </div>

            <div className="already">
              <p>Already have an account?</p>
              <Link to="/login">Sign In</Link>
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
    errors.email = 'Email required.';
  }

  if (!values.get('password')) {
    errors.password = 'Password required.';
  }

  if (!values.get('confirm_password')) {
    errors.confirm_password = 'Password confirmation required.';
  } else {
    if (values.get('password') !== values.get('confirm_password')) {
      errors.confirm_password = "Passwords must match."
    }
  }

  return errors;
}

export default reduxForm({
  form: 'register',
  validate
})(Register);
