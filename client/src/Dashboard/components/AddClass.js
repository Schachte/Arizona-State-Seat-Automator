import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { renderInlineNumberInput } from '../../common/ReduxFormComponents';
import { Form } from 'react-bootstrap';
import Immutable from 'immutable';

async function onSubmit(values){
  console.log(values.toJS());
  console.log("The class number is " + values.get('classNumber'))
  await this.props.getClassName(values.get('classNumber'));
  await this.props.addClass(values.toJS(), this.props.currentClassName)
  await console.log("done");
}

class AddClass extends Component {
  constructor(props){
    super(props);
    this.onSubmit = onSubmit.bind(this);
  }
  
  render(){
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="content-box-large box-with-header">
          <div className="content-box-large">
            <div className="panel-heading">
              <div className="panel-title">Add New Class</div>
            </div>
            <div className="panel-body">
              <Form onSubmit={handleSubmit(this.onSubmit)} inline>
                <div className="col-md-2">
                  <label><b>Class Number:&nbsp;</b></label>
                </div>
                <div className="col-md-10">
                  <Field name="classNumber" component={renderInlineNumberInput} placeholder="Enter Class Number" />
                  <br />
                  <Field name="reserved" component="input" type="checkbox"/>
                  <label>&nbsp;Reserved</label>
                  <br />
                  <button type="submit" className="btn btn-primary">Add Class</button>
                  <span>{this.props.currentClassName}</span>
                </div>
              </Form>
            </div>
          </div>
          <br /><br />
        </div>
      </div>
    )
  }
};

function validate(values) {
  let errors = {};

  if (!values.get('classNumber')) {
    errors.classNumber = 'Class Number Required';
  }

  return errors;
}

const initialValues = Immutable.fromJS( {
  'reserved': false
})

export default reduxForm({
  form: 'addClass',
  touchOnBlur: false,
  initialValues,
  validate
})(AddClass);
