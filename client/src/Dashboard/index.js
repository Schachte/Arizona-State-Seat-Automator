import Immutable from 'immutable'
import { createAction } from 'redux-actions';
import axios from 'axios';

const API_URL = `http://localhost:4567/api/v1`;

const INITIAL_STATE = Immutable.fromJS({
  classes: [
    { class_name: "Mobile Programming", class_number: 12345, professor: "Sarwatio", available_seats: 0, total_seats: 10000 },
    { class_name: "Algorithms", class_number: 38292, professor: "Hong Hong Hong", available_seats: 10, total_seats: 10 }
  ],
  currentClassName: []
});

export const FETCH_CLASSES = 'src/Dashboard/FETCH_CLASSES';
export const ADD_CLASS = 'src/Dashboard/ADD_CLASS';
export const FETCH_CLASS_NAME = 'src/Dashboard/FETCH_CLASS_NAME';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CLASSES:
      console.log(action.payload);
      return state.set('classes', Immutable.fromJS(action.payload));
    case FETCH_CLASS_NAME:
      console.log(action.payload);
      return state.set('currentClassName', Immutable.fromJS(action.payload + " added successfully!"));
    case ADD_CLASS:
      return 
    default:
      return state;
  }
}

export const fetchClasses = createAction(FETCH_CLASSES);
export const addClass = createAction(ADD_CLASS);
export const fetchClassName = createAction(FETCH_CLASS_NAME);

export function addClassRequest(c){
  
  // Build Class Object
  let req = {classNumber: parseInt(c.classNumber), reservedStatus: c.reserved, email: 'code@asu.edu'}
  
  console.log(req);
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
        dispatch(fetchClasses(response.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function fetchClassNameRequest(classNumber) {
  return (dispatch) => {
    return axios.get(`${API_URL}/classes/${classNumber}`)
      .then((response) => {
        console.log("Response: ", response.data);
        dispatch(fetchClassName(response.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
