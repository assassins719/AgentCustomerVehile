import AsyncStorage from '@react-native-community/async-storage';
import {
  ADDED_VEHICLES,
  FETCH_VEHICLES,
  FETCHED_VEHICLES,
  UPDATED_VEHICLES,
  DELETED_VEHICLES,
} from '../constants';

export const addVehicle = vehicle => async (dispatch, getState) => {
  const {
    vehicles: {data},
  } = getState();
  await AsyncStorage.setItem('VEHICLES', JSON.stringify([...data, vehicle]));
  dispatch({
    type: ADDED_VEHICLES,
    payload: data,
  });
};

export const fetchVehicles = () => async dispatch => {
  dispatch({
    type: FETCH_VEHICLES,
  });
  const data = await AsyncStorage.getItem('VEHICLES');
  const vehicles = data ? JSON.parse(data) : [];
  dispatch({
    type: FETCHED_VEHICLES,
    payload: vehicles,
  });
};

export const updateVehicle = (index, vehicle) => async (dispatch, getState) => {
  const {
    vehicles: {data},
  } = getState();
  const updatedData = [...data];
  updatedData.splice(index, 1, vehicle);
  await AsyncStorage.setItem('VEHICLES', JSON.stringify(updatedData));
  dispatch({
    type: UPDATED_VEHICLES,
    payload: {index, vehicle},
  });
};

export const removeVehicle = index => async (dispatch, getState) => {
  const {
    vehicles: {data},
  } = getState();
  const deletedData = [...data];
  deletedData.splice(index, 1);
  await AsyncStorage.setItem('VEHICLES', JSON.stringify(deletedData));
  dispatch({
    type: DELETED_VEHICLES,
    payload: {index},
  });
};
