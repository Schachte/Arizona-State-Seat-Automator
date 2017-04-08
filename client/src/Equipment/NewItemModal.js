import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import {renderInput, renderSelectField} from '../common/ReduxFormComponents';

// const required = value => value ? undefined : 'Required'

class NewItemModal extends Component{
  constructor(props){
    super(props)
    this.state = {showModal: true}
  }
  close() {this.setState({ showModal: false });}
  open() {this.setState({ showModal: true });}
  
  render() {
    return (
      <div>
        <Button bsStyle="success" onClick={this.open.bind(this)}>{this.props.text}</Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form inline>
              <Field name="Serial" component={renderInput} label="Serial #" style={{marginRight: '40px'}}/>
              <Field name="Item" component={renderInput} label="Item #"/>
              <br/>
              <br/>
              <Field name="Type" component={renderSelectField} label="Type"/>
              {/* <br/> */}
              {/* <Field name="Name" component={renderInput} label="Name"/> */}
            </Form>
            </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button bsStyle="success" onClick={() => {
              // TODO: Backend Request

              this.close.bind(this);
            }}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function validate(values){
  let errors = {};
  
  return errors;
}

export default reduxForm({
  form: 'NewItem',
  validate
})(NewItemModal)
