import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
// import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';

export default function LoadingScreen({navigation}) {
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Home');
      }
    });
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#5da96a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
