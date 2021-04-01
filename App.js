/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const App: () => Node = () => {
  const [permissions, setPermissions] = useState({});
  let persistor = persistStore(Store);
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
    console.log('Connected with Firebase');
  }

  useEffect(() => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  });
  // let mqtt = require('mqtt');
  //On publie :
  //mosquitto_sub -h 62.210.73.175 -t "YNOV/BDX/#" -p 8880
  //mosquitto_pub -h 62.210.73.175 -t "YNOV/BDX" -m "Hello MQTT World" -p 8880 -u "equipe7" -P "equipe7"
  //
  // On attends :
  // mosquitto_sub -h 62.210.73.175 -t "YNOV/BDX/#" -p 8880
  // Hello MQTT World
  // let client = mqtt.connect({
  //   servers: [{host: '62.210.73.175', port: 8880, protocol: 'mqtt'}],
  //   username: 'equipe7',
  //   password: 'equipe7',
  // });
  //
  // client.on('connect', function () {
  //   client.subscribe('YNOV/BDX/#', function (err) {
  //     if (!err) {
  //       client.publish('YNOV/BDX/#', 'Hello mqtt wass poppin');
  //     }
  //   });
  // });

  // client.on('message', function (topic, message) {
  //   // message is Buffer
  //   console.log(message.toString());
  //   client.end();
  // });

  const onRemoteNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;
    const actionIdentifier = notification.getActionIdentifier();

    if (actionIdentifier === 'open') {
      // Perform action based on open action
      return <Dashboard showPinLock={true} />;
    }

    if (isClicked) {
      // Navigate user to another screen
      // const navigation = useNavigation();
      // navigation.replace('Dashboard',{});
      return <Dashboard showPinLock={true} />;
    } else {
      // Do something else with push notification
    }
  };

  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          {id: 'open', title: 'Open', options: {foreground: true}},
          {
            id: 'ignore',
            title: 'Desruptive',
            options: {foreground: true, destructive: true},
          },
        ],
      },
    ]);
  };

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
