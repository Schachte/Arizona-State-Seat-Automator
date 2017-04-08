import { connect } from 'react-redux'
import Login from '../components/Login';
import { login } from '../index';

function mapStateToProps(state) {
  return {
    loggedIn: state.getIn(['auth', 'loggedIn'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
