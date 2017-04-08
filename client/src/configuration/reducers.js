import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import equipment from '../Equipment';
import auth from '../auth';

const rootReducer = combineReducers({
  form,
  equipment,
  auth
});

export default rootReducer;
