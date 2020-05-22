import {
  ADDED_CUSTOMERS,
  FETCH_CUSTOMERS,
  FETCHED_CUSTOMERS,
  UPDATED_CUSTOMERS,
  DELETED_CUSTOMERS,
} from '../constants';

const INITIAL_STATES = {
  data: [],
  isLoading: false,
};

function customerReducer(state = INITIAL_STATES, action) {
  const {data} = state;
  switch (action.type) {
    case ADDED_CUSTOMERS:
      return {...state, data: [...state.data, action.payload]};
    case FETCH_CUSTOMERS:
      return {...state, isLoading: true};
    case FETCHED_CUSTOMERS:
      return {...state, isLoading: false, data: action.payload};
    case UPDATED_CUSTOMERS:
      const updatedData = [...data];
      updatedData.splice(action.payload.index, 1, action.payload.customer);
      return {...state, data: updatedData};
    case DELETED_CUSTOMERS:
      const deletedData = [...data];
      deletedData.splice(action.payload.index, 1);
      return {...state, data: deletedData};
    default:
      return state;
  }
}

export default customerReducer;
