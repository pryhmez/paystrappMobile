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
import {socket} from './src/config/socketConfig';
import store from './src/config/configureStore';
import {countdown} from './src/actions/countdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

import Index from './src/index';

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

const Appp = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.lighter,
    height: '100%',
  };

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
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'white'}
      />

      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Index />
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

export default Appp;
