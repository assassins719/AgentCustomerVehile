import {
  ADDED_VEHICLES,
  FETCH_VEHICLES,
  FETCHED_VEHICLES,
  UPDATED_VEHICLES,
  DELETED_VEHICLES,
} from '../constants';

const INITIAL_STATES = {
  data: [],
  isLoading: false,
};

function vehicleReducer(state = INITIAL_STATES, action) {
  const {data} = state;
  switch (action.type) {
    case ADDED_VEHICLES:
      return {...state, data: [...state.data, action.payload]};
    case FETCH_VEHICLES:
      return {...state, isLoading: true};
    case FETCHED_VEHICLES:
      return {...state, isLoading: false, data: action.payload};
    case UPDATED_VEHICLES:
      const updatedData = [...data];
      updatedData.splice(action.payload.index, 1, action.payload.vehicle);
      return {...state, data: updatedData};
    case DELETED_VEHICLES:
      const deletedData = [...data];
      deletedData.splice(action.payload.index, 1);
      return {...state, data: deletedData};
    default:
      return state;
  }
}

export default vehicleReducer;
