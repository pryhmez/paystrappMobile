/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import io from 'socket.io-client';
import {socket} from './src/config/socketConfig';
import store from './src/config/configureStore';
import {countdown} from './src/actions/countdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

import {
  AuthScreenNav,
  TabsNav,
  SplashNav,
  VerifyNav,
  Main,
} from './src/config/router';
import AuthPage from './src/components/AuthPage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// const store = getStore();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.lighter,
    height: '100%',
  };

  // useEffect(() => {
  //   console.log(store.getState().user.userId)
  //   socket.emit('userid', store.getState().user.userId);
  // }, [store.getState()])

  useEffect(() => {
    AsyncStorage.getItem('USER').then(result => {
      if (result) {
        setIsSignedIn(true);
        let {
          token,
          userId,
          email,
          firstName,
          lastName,
          emailVerified,
          phoneVerified,
          accountBalance,
          transactionPin,
          toggleEye
        } = JSON.parse(result);

        if (isEmailVerified) {
          setIsEmailVerified(true);
        }

        store.dispatch({
          type: 'ADD_USER',
          token,
          userId,
          email,
          firstName,
          lastName,
          emailVerified,
          phoneVerified,
          accountBalance,
          transactionPin,
          toggleEye
        });
        socket.on('connect', () => {
          // console.warn('============================')
          socket.emit('userid', userId);
          // console.log(store.getState()); // x8WIv7-mJelg7on_ALbx
        });
      }
      setIsSignedIn(result);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });

    store.subscribe(() => {
      // if (store.getState().user.token != '') {
      // console.log(store.getState().user, isSignedIn)
      if (store.getState().user.token) {
        setIsSignedIn(true);
      }
      // console.log(store.getState().user.emailVerified, store.getState().user.emailVerified === 'true', store.getState().user.transactionPin )
      if (store.getState().user.emailVerified+"" === 'true' && store.getState().user.transactionPin) {
        // if (store.getState().user.emailVerified === true) {
        setIsEmailVerified(true);
      }
    });
    setTimeout(() => {
      // console.log(store);
      setIsLoading(false);
    }, 3000);
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FF9100',
      text: 'black',
      placeholder: '#1D0C4780',
    },
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      {console.log(isSignedIn)}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'white'}
      />

      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            {isLoading ? (
              <SplashNav />
            ) : isSignedIn ? (
              // ) : store.getState().user.token ? (

              isEmailVerified ? (
                // <TabsNav />
                <Main />
              ) : (
                <VerifyNav />
              )
            ) : (
              <AuthScreenNav />
            )}
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
    marginTop: 32,
    paddingHorizontal: 24,
    // backgroundColor: 'green',
  },
});

export default App;
