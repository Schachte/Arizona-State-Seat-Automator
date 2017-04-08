import Immutable from 'immutable'
import { createAction } from 'redux-actions';
import axios from 'axios';

const API_URL = `localhost:3000/api/v1`;

const INITIAL_STATE = Immutable.fromJS({
  classes: [
    { class_name: "Mobile Programming", class_number: 12345, professor: "Sarwatio", available_seats: 0, total_seats: 10000 },
    { class_name: "Algorithms", class_number: 38292, professor: "Hong Hong Hong", available_seats: 10, total_seats: 10 }
  ]
});

export const FETCH_CLASSES = 'src/Dashboard/FETCH_CLASSES';
export const ADD_CLASS = 'src/Dashboard/ADD_CLASS';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CLASSES:
      return state.set('classes', action.payload);
    case ADD_CLASS:
      return state;
    default:
      return state;
  }
}

export const fetchClasses = createAction(FETCH_CLASSES);
export const addClass = createAction(FETCH_CLASSES);

export function addClassRequest(c){
  
  // Build Class Object
  let req = {classNumber: c.classNumber, reservedStatus: c.reserved, email: 'code@asu.edu'}
  
  return (dispatch) => {
    return axios.post(`${API_URL}/classes/`, req)
      .then((response) => {
        console.log("Response: ", response);
        dispatch(addClass(response.data.class))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
}

export function fetchClassesRequest() {
  
  return (dispatch) => {
    return axios.get(`${API_URL}/classes/`)
      .then((response) => {
        console.log("Response: ", response);
        dispatch(fetchClasses(response.data.classes))
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
