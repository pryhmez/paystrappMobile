/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import io from "socket.io-client"
import { socket } from "./src/config/socketConfig";
import store from './src/config/configureStore';
import { countdown } from './src/actions/countdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AuthScreenNav,
  TabsNav,
  SplashNav,
  VerifyNav,
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
        } = JSON.parse(result);
        
        if(isEmailVerified) {
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
          phoneVerified
        });
        socket.on("connect", () => {
          socket.emit("userid", userId)
          // console.log(store.getState()); // x8WIv7-mJelg7on_ALbx
    
        }); 
      }
      setIsSignedIn(result);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });


    store.subscribe(() => {
      if (store.getState().user.token != '') {
        setIsSignedIn(true);
      }

      if (store.getState().user.emailVerified  == true) {
        // console.log('setting to true')
        setIsEmailVerified(true);
      }
    });
    setTimeout(() => {
      // console.log(store);
      setIsLoading(false);
    }, 3000);



  }, []);

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Provider store={store}>
        <NavigationContainer>
          {isLoading ? (
            <SplashNav />
          ) : isSignedIn ? (
            isEmailVerified ? (
              <TabsNav />
            ) : (
              <VerifyNav />
            )
          ) : (
            <AuthScreenNav />
          )}
        </NavigationContainer>
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
