import { connect } from 'react-redux'
import Register from '../components/Register';
import { registerRequest } from '../index';

function mapStateToProps(state) {
  return {
    // loggedIn: state.getIn(['auth', 'loggedIn'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    register: (values) => dispatch(registerRequest(values))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
