import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class CheckOutModal extends Component{
  constructor(props){
    super(props)
    this.state = {showModal: false}
  }
  close() {this.setState({ showModal: false });}
  open() {this.setState({ showModal: true });}
  
  
  render() {
    const item = this.props.item;
    return (
      <div>
        <button type="button" className="btn btn-success" onClick={this.open.bind(this)}>Check Out</button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Check-Out Equipment</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to checkout {item.get('name')}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button bsStyle="success" onClick={() => {
              // TODO: Send Validation Request
              this.close.bind(this);
            }}>Check-Out</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CheckOutModal;
