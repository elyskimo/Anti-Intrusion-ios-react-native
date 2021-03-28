/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from 'firebase';
import apiKeys from './src/config/keys';
import {connect, Provider} from 'react-redux';
import Store from '@redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import WelcomeScreen from './src/screens/Welcome';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import LoadingScreen from './src/screens/Loading';
import Dashboard from './src/screens/Dashboard';

const Stack = createStackNavigator();

const App: () => Node = () => {
  let persistor = persistStore(Store);
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
    console.log('Connected with Firebase');
  }

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={'Loading'}
              component={LoadingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Sign Up"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Sign In"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'Dashboard'}
              component={Dashboard}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
