import Immutable from 'immutable'
import { createAction } from 'redux-actions';
import axios from 'axios';

const API_URL = `localhost:3000`;

const INITIAL_STATE = Immutable.fromJS({
  equipment: [
    {serial: 123, item: 1, type: 'Laptop', name: 'MacBookPro 13"', available: true, checkedOutBy: null},
    {serial: 463, item: 2, type: 'Dongle', name: 'VGA to USB-C', available: false, checkedOutBy: 'Blake Thomson'},
    {serial: 308, item: 3, type: 'Laptop', name: 'MacBookPro', available: true, checkedOutBy: null},
    {serial: 113, item: 4, type: 'Laptop', name: 'MacBookPro', available: false, checkedOutBy: 'Ryan Schachte'}
  ] 
});

export const FETCH_EQUIPMENT = 'src/Equipment/FETCH_EQUIPMENT';

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_EQUIPMENT:
      return state.set('equipment', action.payload);
    default: 
      return state;
  }
}

export const fetchEquipment = createAction(FETCH_EQUIPMENT);

export function fetchEquipmentRequest(t) {
  return (dispatch) => {
    return axios.get(`${API_URL}/equipment/`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then((response) => {
        console.log("Response: ", response);
        // dispatch(fetchEquipment(response.data.equipment)))
        // return response
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
