import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function WelcomeScreen({navigation}) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/background.jpg')}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Anti-Intrusion</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Sign Up')}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <Text style={styles.inlineText}>Avez-vous déjà un compte ?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    // backgroundColor: '#4ecdc4',
    backgroundColor: '#5da96a',
    padding: 5,
    margin: '2%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },
  spacer: {
    height: 50,
    // marginVertical: 30,
  },
});
