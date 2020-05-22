import React, {useReducer, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';

import AuthContext from './src/AuthContext';

import Appointments from './src/pages/appointments';
import Appointmentdetail from './src/pages/appointmentdetail';
import Customers from './src/pages/customers';
import CustomerDetail from './src/pages/customerdetail';
import Vehicles from './src/pages/vehicles';
import Vehicledetail from './src/pages/vehicledetail';
import Signin from './src/pages/signin';
import Signup from './src/pages/signup';

import {fetchVehicles} from './src/redux/actions/vehicles';
import {fetchCustomers} from './src/redux/actions/customers';
import {fetchAppointments} from './src/redux/actions/appointments';

const MainStack = createStackNavigator();
const MainScreen = connect()(({dispatch}) => {
  useEffect(() => {
    const initialLoad = () => {
      dispatch(fetchVehicles());
      dispatch(fetchCustomers());
      dispatch(fetchAppointments());
    };
    initialLoad();
  }, [dispatch]);

  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Appointments" component={Appointments} />
      <MainStack.Screen
        name="Appointmentdetail"
        component={Appointmentdetail}
      />
      <MainStack.Screen name="Customers" component={Customers} />
      <MainStack.Screen name="Customerdetail" component={CustomerDetail} />
      <MainStack.Screen name="Vehicles" component={Vehicles} />
      <MainStack.Screen name="Vehicledetail" component={Vehicledetail} />
    </MainStack.Navigator>
  );
});

const AuthStack = createStackNavigator();
const AuthScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Signin" component={Signin} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

const AppStack = createStackNavigator();

export default function App({navigation}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            USERDATA: action.data,
            isLoading: false,
          };
        case 'SIGN_UP':
          AsyncStorage.setItem('USERDATA', action.data);
          return {
            ...prevState,
            isSignedin: true,
            isLoading: false,
            USERDATA: action.data,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedin: true,
            isLoading: false,
          };
        case 'SIGN_OUT':
          AsyncStorage.setItem('USERDATA', null);
          return {
            ...prevState,
            isSignedin: false,
            USERDATA: null,
          };
      }
    },
    {
      isLoading: true,
      isSignedin: false,
      USERDATA: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let USERDATA;
      try {
        USERDATA = await AsyncStorage.getItem('USERDATA');
      } catch (e) {}
      dispatch({type: 'RESTORE_TOKEN', data: JSON.parse(USERDATA)});
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        let USERDATA;
        try {
          USERDATA = await AsyncStorage.getItem('USERDATA');
          USERDATA = JSON.parse(USERDATA);
        } catch (e) {}
        if (USERDATA == null) {
          showMessage({
            message: 'Please Register first',
            desciption: 'Please Register first',
            type: 'warning',
          });
        } else {
          if (
            data.username === USERDATA.username &&
            data.password === USERDATA.password
          ) {
            dispatch({type: 'SIGN_IN', data: JSON.stringify(data)});
          } else {
            showMessage({
              message: 'Invalid Credential',
              desciption: 'Please input valid username and password',
              type: 'warning',
            });
          }
        }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        dispatch({type: 'SIGN_UP', data: JSON.stringify(data)});
      },
    }),
    [],
  );


  return (
    <AuthContext.Provider value={authContext}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {state.isSignedin === false ? (
          <AppStack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <AppStack.Screen name="Home" component={MainScreen} />
        )}
      </AppStack.Navigator>
    </AuthContext.Provider>
  );
}
