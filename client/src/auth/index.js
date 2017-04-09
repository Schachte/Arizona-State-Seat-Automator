import Immutable from 'immutable'
import axios from 'axios';
import { createAction } from 'redux-actions';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = Immutable.fromJS({
  loggedIn: false
});

export const LOGIN = 'src/auth/LOGIN';
export const LOGOUT = 'src/auth/LOGOUT';
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

export function registerRequest(values) {

  // Build Class Object
  // eslint-disable-next-line
  let req = {
    email: values.get('email'),
    password: values.get('password'),
    phone_number: values.get('phone_number'),
    phone_carrier: values.get('phone_carrier')
  };

  // console.log(req);
  return (dispatch) => {
    return new Promise((resolve, reject) =>
      axios.post(`${API_URL}/users/`, req)
        .then(response => {
          console.log("Action Response: ", response);
          dispatch(register())
          resolve();
          // dispatch(addClass(response.data.class, cName))
        })
        .catch(err => {
          console.log("Action Error: ", err);

          let errObj = {};

          // TODO: email: err.response.data.email
          // Testing Async Validation -- 
          if (req.email === 'test@test.com') {
            errObj.email = 'Email already registered.';
          }

          // TODO: phone_number: err.response.data.phone_number
          if (req.phone_number === '9999999999') {
            errObj.phone_number = 'Phone number already registered.'
          }

          if (Object.keys(errObj).length > 0) {
            reject(errObj);
          } else {
            dispatch(register());
            resolve();
          }
        })
    );
  }
}
