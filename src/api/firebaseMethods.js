// import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export async function registration(email, password, lastName, firstName) {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    const currentUser = auth().currentUser;

    const db = firestore();
    await db.collection('users').doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
    });
  } catch (err) {
    Alert.alert('There is something wrong!!!!', err.message);
  }
}

export async function signIn(email, password) {
  try {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('user connected');
      });
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function loggingOut() {
  try {
    await auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}
