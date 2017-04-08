import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class CheckOutModal extends Component{
  constructor(props){
    super(props)
    this.state = {showModal: false}
    // this.props["item"] = 'MacBookPro 13"'
  }
  close() {this.setState({ showModal: false });}
  open() {this.setState({ showModal: true });}
  
  
  render() {
    const item = this.props.item.name;
    return (
      <div>
        <Button bsStyle="danger" onClick={this.open.bind(this)}>Check In</Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Check-In Equipment</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to checkin {item}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={() => {
              // TODO: Send Validation Request
              this.close.bind(this);
            }}>Check-In</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CheckOutModal;
