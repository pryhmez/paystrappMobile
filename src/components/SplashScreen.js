import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,

} from 'react-native';
import Logo from './helpers/logo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SplashScreen = props => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='white' />


      <Logo styles={{width: 250, height: 300}}/>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#1D0C47',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
  },
  sliderItem: {
    height: hp('60%'),
    width: wp('75%'),
    backgroundColor: '#F2F2F2',
    margin: wp('2.5%'),
    borderRadius: 7,
    borderColor: '#1D0C47',
    borderWidth: 1,
    padding: 10,
  },
});

export default SplashScreen;
