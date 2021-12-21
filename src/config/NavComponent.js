import React, {useState, useEffect} from 'react';
import {
   View,
 } from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {
   AuthScreenNav,
   TabsNav,
   SplashNav,
   VerifyNav,
   Main,
 } from './router';



const NavComponent = (props) => {

   return (
 
      <>
         <NavigationContainer>
            {/* {console.log(props.isSignedIn, '=============')} */}
            {props.isLoading ? (
              <SplashNav />
            ) : props.user.token !== "" ? (
              // ) : store.getState().user.token ? (
              props.isEmailVerified ? (
                // <TabsNav />
                <Main />
              ) : (
                <VerifyNav />
              )
            ) : (
              <AuthScreenNav />
            )}
          </NavigationContainer>
      </>
   )
 }

 const mapStateToProps = state => {
   return {
     user: state.user,
     countdown: state.countdown,
   };
 };

 export default connect(mapStateToProps)(NavComponent)

