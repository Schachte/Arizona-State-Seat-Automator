import React from 'react';
import NewItemModal from './NewItemModal';

const Equipment = () => (
  <div>
    <h3 className="page-header">Equipment</h3>
    <div className="container">

      <div className="row">
        <NewItemModal text="New Item"/>
      </div>
    </div>
  </div>
);

export default Equipment;
