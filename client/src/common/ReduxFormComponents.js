import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

export const renderInput = ({ input, label, type, style, meta: { touched, error, warning } }) => {
  let errorStatus = (error && touched) ? 'error' : null;
  return (
    <FormGroup validationState={errorStatus}>
      <div style={style}>
        <label><b>{label}</b></label>
        <br />
        <FormControl {...input} type={type} placeholder={label} />
        <HelpBlock>{touched && error}</HelpBlock>
      </div>
    </FormGroup>
  )
}

export const renderInlineNumberInput = ({ input, label, type, style, meta: { touched, error, warning } }) => {
  let errorStatus = (error && touched) ? 'error' : null;
  return (
    <FormGroup validationState={errorStatus}>
      <div style={style}>
        <FormControl
          {...input}
          type={type}
          placeholder={label}
          onChange={(e) => {
            //eslint-disable-next-line
            let val = parseInt(e.target.value);
            {/*If the value is a number and <= 5 digits, allow it. */ }
            if (!isNaN(val) && e.target.value.toString().length <= 5) {
              input.onChange(val);

              {/* Allow the form to be completely empmtied.*/ }
            } else if (e.target.value === '') {
              input.onChange(e.target.value)
            }
          }}
        />
        <HelpBlock>{touched && error}</HelpBlock>
      </div>
    </FormGroup>
  )
}