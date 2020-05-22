import {
  ADDED_APPOINTMENTS,
  FETCH_APPOINTMENTS,
  FETCHED_APPOINTMENTS,
  UPDATED_APPOINTMENTS,
  DELETED_APPOINTMENTS,
} from '../constants';

const INITIAL_STATES = {
  data: [],
  isLoading: false,
};

function appointmentReducer(state = INITIAL_STATES, action) {
  const {data} = state;
  switch (action.type) {
    case ADDED_APPOINTMENTS:
      return {...state, data: [...state.data, action.payload]};
    case FETCH_APPOINTMENTS:
      return {...state, isLoading: true};
    case FETCHED_APPOINTMENTS:
      return {...state, isLoading: false, data: action.payload};
    case UPDATED_APPOINTMENTS:
      const updatedData = [...data];
      updatedData.splice(action.payload.index, 1, action.payload.appointment);
      return {...state, data: updatedData};
    case DELETED_APPOINTMENTS:
      const deletedData = [...data];
      deletedData.splice(action.payload.index, 1);
      return {...state, data: deletedData};
    default:
      return state;
  }
}

export default appointmentReducer;
