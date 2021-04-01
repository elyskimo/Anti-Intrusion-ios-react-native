import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {loggingOut} from '../api/firebaseMethods';
import PINCode, {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectUser, disconnectUser} from '@redux/user/actions';
import messaging from '@react-native-firebase/messaging';
import {log} from 'react-native-reanimated';

const Dashboard = props => {
  const {connectUser, disconnectUser, user} = props;
  const navigation = useNavigation();
  let currentUserUID = auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');
  const [pinCode, setPinCode] = useState(null);
  const [showPinLock, setShowPinLock] = useState(false);
  const [PINCodeStatus, setPINCodeStatus] = useState('choose');

  useEffect(() => {
    let isMounted = true;
    getUserInfo();
    return () => {
      isMounted = false;
    };

    async function getUserInfo() {
      let doc = await firestore().collection('users').doc(currentUserUID).get();

      if (!doc.exists) {
        Alert.alert('Dashboard: No user data found!');
      } else {
        let dataObj = doc.data();
        if (isMounted) {
          setFirstName(dataObj.firstName);
        }
      }
    }
  });

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }

  const register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
    await messaging().setAutoInitEnabled();
  };

  const checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch(err => console.log('Permission rejected ', err));
  };

  const getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('No token');
        }
      })
      .catch(err => console.log('getToken rejected ', err));
  };

  const requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(err => console.log('requestPermission rejected', err));
  };

  const deleteToken = () => {
    messaging()
      .deleteToken()
      .catch(err => {
        console.log('Delete token error', err);
      });
  };

  const handlePress = async () => {
    // await loggingOut();
    disconnectUser();
    navigation.replace('Home');
  };

  const test = () => {
    console.log('pincode');
  };

  const _showChoosePinLock = () => {
    // this.setState({PINCodeStatus: 'choose', showPinLock: true});
    setPINCodeStatus('choose');
    setShowPinLock(true);
  };

  const _finishProcess = async () => {
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {
      Alert.alert(null, 'Le code PIN a été sauvegardé', [
        {
          title: 'Ok',
          onPress: () => {
            // do nothing
          },
        },
      ]);
      setShowPinLock(false);
    }
  };

  const _showEnterPinLock = async () => {
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {
      setPINCodeStatus('enter');
      setShowPinLock(true);
    } else {
      Alert.alert(null, 'You have not set your pin.', [
        {
          title: 'Ok',
          onPress: () => {
            // do nothing
          },
        },
      ]);
    }
  };

  const pinCodeCancel = () => {
    setShowPinLock(false);
  };

  const renderElement = () => {
    if (showPinLock) {
      return (
        <View>
          <View style={styles.container2}>
            <TouchableOpacity style={styles.cancelBtn} onPress={pinCodeCancel}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <PINCode
              status={PINCodeStatus}
              passwordLength={6}
              touchIDDisabled={true}
              finishProcess={() => _finishProcess()}
              lockedPage={false}
              maxAttempts={0}
              titleChoose={'Entrez le code'}
              titleConfirm={'Confirmez le code'}
              subtitleChoose={'hbhjghg'}
              titleAttemptFailed={'Code pas bon'}
              subtitleError={'Veuillez réessayer'}
              titleConfirmFailed={'Les codes ne correspondent pas'}
              titleEnter={'Rentrez le code'}
              subtitleEnter={"pour désactiver l'alarme"}
              colorCircleButtons={'#ff9999'}
              colorPassword={'#ff9999'}
              colorPasswordEmpty={'#ffffff'}
              styleLockScreenTitle={'#ffffff'}
              stylePinCodeButtonNumber={'#ffffff'}
              numbersButtonOverlayColor={'#864f4f'}
              stylePinCodeDeleteButtonColorShowUnderlay={'#864f4f'}
              stylePinCodeColorTitle={'#ffffff'}
              stylePinCodeColorSubtitle={'#ffffff'}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Accueil</Text>
          <Text style={styles.text}>Bonjour {firstName}</Text>
          {/*<TouchableOpacity style={styles.button} onPress={_showChoosePinLock}>*/}
          {/*  <Text style={styles.buttonText}>Définir un code PIN</Text>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity style={styles.button} onPress={_showEnterPinLock}>
            <Text style={styles.buttonText}>Désactiver l'alarme</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return renderElement();
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelBtn: {
    marginTop: 50,
    // marginRight: 200,
    marginLeft: 0,
    width: 150,
    padding: 5,
    // backgroundColor: '#ff9999',
    // borderWidth: 2,
    // borderColor: 'white',
    // borderRadius: 15,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  container: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#5da96a',
    backgroundColor: '#575d58',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    // height: '100%',
    width: '100%',
    // backgroundColor: '#5da96a',
    backgroundColor: '#575d58',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    marginTop: '2%',
    marginBottom: '10%',
    fontWeight: 'bold',
    color: 'black',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  spacer: {
    height: 50,
    // marginVertical: 30,
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
