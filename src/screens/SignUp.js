import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {registration} from '../api/firebaseMethods';
import {useNavigation} from '@react-navigation/native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectUser, disconnectUser} from '@redux/user/actions';

const SignUp = props => {
  const {connectUser, disconnectUser, user} = props;
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = async () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      await registration(email, password, lastName, firstName).then(() => {
        connectUser(firstName, lastName, email);
        console.log('in register');
      });
      console.log('after register');
      navigation.navigate('Loading');
      emptyState();
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Create an account </Text>

        <ScrollView onBlur={Keyboard.dismiss}>
          <TextInput
            style={styles.textInput}
            placeholder="First name*"
            value={firstName}
            onChangeText={name => setFirstName(name)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last name"
            value={lastName}
            onChangeText={name => setLastName(name)}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your email*"
            value={email}
            onChangeText={email => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your password*"
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Retype your password to confirm*"
            value={confirmPassword}
            onChangeText={password2 => setConfirmPassword(password2)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>

          <Text style={styles.inlineText}>Avez-vous déjà un compte ?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Sign In')}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#5da96a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '5%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop: '15%',
    fontWeight: 'bold',
    color: '#000000',
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#a4eddf',
    padding: 10,
    margin: 5,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      connectUser,
      disconnectUser,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
