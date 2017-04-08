import { connect } from 'react-redux'
import { addClassRequest } from '../index';
import AddClass from '../components/AddClass';

function mapStateToProps(state) {
  return {
    classes: state.getIn(['dashboard', 'classes'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addClass: (c) => dispatch(addClassRequest(c))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClass);
