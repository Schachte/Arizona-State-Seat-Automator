import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import { renderInput, renderDropdown } from '../../common/ReduxFormComponents';

const carriers = [
  { value: 'verizon', label: 'Verizon' },
  { value: 'sprint', label: 'Sprint' },
  { value: 'tmobile', label: 'T-Mobile' },
  { value: 'att', label: 'AT&T' },
  { value: 'metropcs', label: 'Metro PCS' },
  { value: 'virgin', label: 'Virgin Mobile' }
]

function onSubmit(values) {
  console.log(values.toJS());
  return this.props.register(values)
    .then(res => {
      console.log("Response from promise: ", res);
      this.props.history.push('/')
    })
    .catch(err => {
      console.log("Error from promise: ", err);
      let errorObj = {};

      if (err.email) {
        errorObj.email = err.email;
      }

      if (err.phone_number) {
        errorObj.phone_number = err.phone_number;
      }

      if (Object.keys(errorObj).length > 0) {
        throw new SubmissionError(errorObj)
      }
    })
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
                  <Field name="email" type="email" component={renderInput} label="E-mail address" />
                  <Field name="password" type="password" component={renderInput} label="Password" />
                  <Field name="confirm_password" type="password" component={renderInput} label="Confirm Password" />
                  <Field name="phone_number" type="tel" component={renderInput} label="Phone Number" />
                  <Field name="phone_carrier" type="" component={renderDropdown} label="Select Phone Carrier" options={carriers} />
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
      errors.confirm_password = 'Passwords must match.'
    }
  }

  if (!values.get('phone_number')) {
    errors.phone_number = 'Phone Number required.'
  } else {
    let phone_regex = /^\d{10}$/;
    if (!values.get('phone_number').match(phone_regex)) {
      errors.phone_number = 'Phone number does not match desired format: "1234567899"';
    }
  }

  if (!values.get('phone_carrier')) {
    errors.phone_carrier = 'Carrier required.'
  }

  return errors;
}

export default reduxForm({
  form: 'register',
  touchOnBlur: false,
  validate
})(Register);
