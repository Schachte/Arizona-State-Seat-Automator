import Immutable from 'immutable'
import { createAction } from 'redux-actions';

const INITIAL_STATE = Immutable.fromJS({
  loggedIn: false
});

export const LOGIN = 'src/auth/LOGIN';
export const LOGOUT = 'src/auth/LOGIN';
export const REGISTER = 'src/auth/REGISTER';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.loggedIn = true;
      return state.set('loggedIn', true);
    case REGISTER:
      localStorage.loggedIn = true;
      return state.set('loggedIn', true);
    case LOGOUT:
      delete localStorage.loggedIn;
      return state.set('loggedIn', false);
    default:
      return state;
  }
}

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const register = createAction(REGISTER);
