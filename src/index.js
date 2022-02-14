/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {socket} from './config/socketConfig';
 import {connect, useDispatch, useSelector} from 'react-redux';
 import { addUser } from './actions/user';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { LogBox } from 'react-native';
 LogBox.ignoreLogs(['new NativeEventEmitter']);
 
 import {
   AuthScreenNav,
   TabsNav,
   SplashNav,
   VerifyNav,
   Main,
 } from './config/router';
 
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
 
 
 const Index = (props) => {
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
           accountBalance
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
           accountBalance
         });
         socket.on('connect', () => {
           // console.warn('============================')
           socket.emit('userid', userId);
         });
       }
       setIsSignedIn(result);
       setTimeout(() => {
         setIsLoading(false);
       }, 3000);
     });
 
     store.subscribe(() => {
       // if (store.getState().user.token != '') {
       if (store.getState().user.token) {
       setIsSignedIn(true);
       }
 
       if (store.getState().user.emailVerified) {
         console.warn('email verified')
 
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
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'white'} />
             {isLoading ? (
               <SplashNav />
             ) : isSignedIn ? (
               props.isEmailVerified ? (
                 // <TabsNav />
                 <Main />
               ) : (
                 <VerifyNav />
               )
             ) : (
               <AuthScreenNav />
             )}

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
 
 const mapStateToProps = state => {
   return {
     user: state.user,
     countdown: state.countdown,
   };
 };

 export default connect(mapStateToProps)(Index);
 