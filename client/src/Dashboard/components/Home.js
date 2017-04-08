import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import Dashboard from './Dashboard'
import AddClass from './AddClass';

const Sidebar = () => {
  return (
    <div className="sidebar content-box" style={{ display: "block" }}>
      <ul className="nav">
        <li><NavLink exact to="/" activeClassName="current"><i className="glyphicon glyphicon-home"></i> Dashboard</NavLink></li>
        <li><NavLink to="/add" activeClassName="current"><i className="glyphicon glyphicon-plus"></i> Add class</NavLink></li>
        <li><NavLink to="/notifications" activeClassName="current"><i className="glyphicon glyphicon-comment"></i> Notifications</NavLink></li>
        <li><NavLink to="/upgrade" activeClassName="current"><i className="glyphicon glyphicon-usd"></i> Upgrade</NavLink></li>
      </ul>
    </div>
  )
};

const Home = (props) => (
  <div className="row">

    <div className="col-md-2">
      <Sidebar />
    </div>

    <div className="col-md-10">
      <Route exact path="/" component={Dashboard} />
      <Route path="/add" component={AddClass} />

    </div>
  </div>
)

function mapStateToProps(state) {
  return {
    // equipment: state.getIn(['equipment', 'equipment'])
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
