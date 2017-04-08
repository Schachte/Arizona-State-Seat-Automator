import React from 'react';
import AvailableEquipment from './Dashboard/components/AvailableEquipment';
import UnavailableEquipment from './Dashboard/components/UnavailableEquipment';
import CheckedOutItems from './Dashboard/components/CheckedOutItemsTable';
import InfoBox from './common/InfoBox';

import {connect} from 'react-redux';

const Home = (props) => (
  <div>
    <h3 className="page-header">Home</h3>
    <div className="row">
      <InfoBox color="blue-bg" icon="fa-laptop" value={3} title="Computers Available"/>
      <InfoBox color="brown-bg" icon="fa-laptop" value={4} title="Accessories Available"/>
      <InfoBox color="dark-bg" icon="fa-laptop" value={9} title="Your Number of Items"/>
    </div>
    <div className="row">

      {/* Available Table */}
      <div className="col-sm-6">
        <AvailableEquipment data={props.equipment.filter((item) => item.get('available'))}/>
      </div>

      {/* Unavailable Table */}
      <div className="col-sm-6">
        <UnavailableEquipment data={props.equipment.filter((item) => !item.get('available'))}/>
      </div>
    </div>

    {/* Checked Out Items */}
    <div className="row">
      <div className="col-lg-12">
        <CheckedOutItems />  
      </div>
    </div>
  </div>
)

function mapStateToProps(state) {
  return {
    equipment: state.getIn(['equipment', 'equipment'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // login: () => dispatch(login())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
