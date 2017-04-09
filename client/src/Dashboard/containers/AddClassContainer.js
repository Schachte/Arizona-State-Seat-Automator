import { connect } from 'react-redux'
import { addClassRequest, fetchClassNameRequest } from '../index';
import AddClass from '../components/AddClass';

function mapStateToProps(state) {
  return {
    classes: state.getIn(['dashboard', 'classes']),
    currentClassName: state.getIn(['dashboard', 'currentClassName'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addClass: (c, cName) => dispatch(addClassRequest(c, cName)),
    getClassName: (c) => dispatch(fetchClassNameRequest(c))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClass);
