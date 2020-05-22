import {combineReducers} from 'redux';

import vehiclesReducer from './vehicles';
import appointmentReducer from './appointments';
import customerReducer from './customers';

export default combineReducers({
  vehicles: vehiclesReducer,
  customers: customerReducer,
  appointments: appointmentReducer,
});
