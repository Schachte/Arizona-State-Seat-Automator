import { connect } from 'react-redux'
import Register from '../components/Register';
import { register } from '../index';

function mapStateToProps(state) {
  return {
    // loggedIn: state.getIn(['auth', 'loggedIn'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    register: () => dispatch(register())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
