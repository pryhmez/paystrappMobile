import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Button, ThemeProvider } from 'react-native-elements';

const AuthPage = (props) => {
  const onSignUpClick = () => {
    props.navigation.navigate('SignUp');
  };

  const onSignInClick = () => {
    props.navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1c" />
      <View style={styles.container}>
        <View
          style={{
            ...styles.btnContainer,
            flex: 1.2,
            justifyContent: null,
            marginTop: '18%',
            alignItems: null,
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              ...styles.text,
              alignSelf: 'center',
              fontSize: 35,
              fontWeight: 'bold',
            }}>
            WELCOME
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={onSignUpClick}>
              <Text style={styles.text}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.btn, backgroundColor: '#1D0C47'}}
            onPress={onSignInClick}>
            <Text style={{...styles.text, color: 'white'}}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  textWelcome: {
    color: '#1D0C47',
    alignSelf: null,
  },
  text: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  btnContainer: {
    flex: 1,
    // marginTop: '70%',
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '90%',
    height: '14%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
    // paddingVertical: 12,
    elevation: 200,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default AuthPage;
