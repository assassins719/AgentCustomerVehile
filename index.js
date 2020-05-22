import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';

import App from './App';
import store from './src/redux';
import {name as appName} from './app.json';

console.disableYellowBox = true;

const Application = () => (
  <>
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <App />
        <FlashMessage position="top" animated={true} />
      </NavigationContainer>
    </Provider>
  </>
);

AppRegistry.registerComponent(appName, () => Application);
