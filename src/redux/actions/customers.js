import AsyncStorage from '@react-native-community/async-storage';
import {
  ADDED_CUSTOMERS,
  FETCH_CUSTOMERS,
  FETCHED_CUSTOMERS,
  UPDATED_CUSTOMERS,
  DELETED_CUSTOMERS,
} from '../constants';

export const addCustomer = customer => async (dispatch, getState) => {
  const {
    customers: {data},
  } = getState();
  await AsyncStorage.setItem('CUSTOMERS', JSON.stringify([...data, customer]));
  dispatch({
    type: ADDED_CUSTOMERS,
    payload: customer,
  });
};

export const fetchCustomers = () => async dispatch => {
  dispatch({
    type: FETCH_CUSTOMERS,
  });
  const data = await AsyncStorage.getItem('CUSTOMERS');
  const customers = data ? JSON.parse(data) : [];
  dispatch({
    type: FETCHED_CUSTOMERS,
    payload: customers,
  });
};

export const updateCustomer = (index, customer) => async (
  dispatch,
  getState,
) => {
  const {
    customers: {data},
  } = getState();
  const updatedData = [...data];
  updatedData.splice(index, 1, customer);
  await AsyncStorage.setItem('CUSTOMERS', JSON.stringify(updatedData));
  dispatch({
    type: UPDATED_CUSTOMERS,
    payload: {index, customer},
  });
};

export const removeCustomer = index => async (dispatch, getState) => {
  const {
    customers: {data},
  } = getState();
  const deletedData = [...data];
  deletedData.splice(index, 1);
  await AsyncStorage.setItem('CUSTOMERS', JSON.stringify(deletedData));
  dispatch({
    type: DELETED_CUSTOMERS,
    payload: {index},
  });
};
