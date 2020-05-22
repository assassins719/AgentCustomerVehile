import AsyncStorage from '@react-native-community/async-storage';
import {
  ADDED_APPOINTMENTS,
  FETCH_APPOINTMENTS,
  FETCHED_APPOINTMENTS,
  UPDATED_APPOINTMENTS,
  DELETED_APPOINTMENTS,
} from '../constants';

export const addAppointment = appointment => async (dispatch, getState) => {
  const {
    appointments: {data},
  } = getState();
  await AsyncStorage.setItem(
    'APPOINTMENTS',
    JSON.stringify([...data, appointment]),
  );
  dispatch({
    type: ADDED_APPOINTMENTS,
    payload: appointment,
  });
};

export const fetchAppointments = () => async dispatch => {
  dispatch({
    type: FETCH_APPOINTMENTS,
  });
  const data = await AsyncStorage.getItem('APPOINTMENTS');
  const appointments = data ? JSON.parse(data) : [];
  dispatch({
    type: FETCHED_APPOINTMENTS,
    payload: appointments,
  });
};

export const updateAppointment = (index, appointment) => async (
  dispatch,
  getState,
) => {
  const {
    appointments: {data},
  } = getState();
  const updatedData = [...data];
  updatedData.splice(index, 1, appointment);
  await AsyncStorage.setItem('APPOINTMENTS', JSON.stringify(updatedData));
  dispatch({
    type: UPDATED_APPOINTMENTS,
    payload: {index, appointment},
  });
};

export const removeAppointment = index => async (dispatch, getState) => {
  const {
    appointments: {data},
  } = getState();
  const deletedData = [...data];
  deletedData.splice(index, 1);
  await AsyncStorage.setItem('APPOINTMENTS', JSON.stringify(deletedData));
  dispatch({
    type: DELETED_APPOINTMENTS,
    payload: {index},
  });
};
