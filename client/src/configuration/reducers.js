import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import dashboard from '../Dashboard';
import auth from '../auth';

const rootReducer = combineReducers({
  form,
  dashboard,
  auth
});

export default rootReducer;
