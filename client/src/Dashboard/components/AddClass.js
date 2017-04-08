import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { renderInlineNumberInput } from '../../common/ReduxFormComponents';
import { Form } from 'react-bootstrap';

const onSubmit = (values) => {

  console.log(values.toJS());
}

const AddClass = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="row">
      <div className="content-box-large box-with-header">
        <div className="content-box-large">
          <div className="panel-heading">
            <div className="panel-title">Add New Class</div>
          </div>
          <div className="panel-body">
            <Form onSubmit={handleSubmit(onSubmit)} inline>
              <div className="col-md-2">
                <label><b>Class Number:&nbsp;</b></label>
              </div>
              <div className="col-md-10">
                <Field name="class" component={renderInlineNumberInput} placeholder="Enter Class Number" />
                <br />
                <button type="submit" className="btn btn-primary">Add Class</button>
              </div>
            </Form>
          </div>
        </div>
        <br /><br />
      </div>
    </div>
  )
};

function validate(values) {
  let errors = {};

  if (!values.get('class')) {
    errors.class = 'Class Number Required';
  }

  return errors;
}

export default reduxForm({
  form: 'addClass',
  touchOnBlur: false,
  validate
})(AddClass);