import React, {Component} from 'react';
import { NavLink, Route } from 'react-router-dom';
import {fetchClassesRequest} from '..';

import { connect } from 'react-redux';
import Dashboard from './Dashboard'
import AddClass from '../containers/AddClassContainer';

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

class Home extends Component {
  
  componentWillMount(){
    console.log("Mounted");
    this.props.fetchClasses()
    console.log("Props: ", this.props);
  }
  
  render(){
    return (
      <div className="row">

        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <Route exact path="/" render={() => <Dashboard classes={this.props.classes}/>} />
          <Route path="/add" component={AddClass} />

        </div>
      </div>
    );
}
}

function mapStateToProps(state) {
  return {
    classes: state.getIn(['dashboard', 'classes'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchClasses: () => dispatch(fetchClassesRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
