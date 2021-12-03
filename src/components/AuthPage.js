import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import Logo from './helpers/logo';
import Button from './helpers/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import slide1 from '../assets/slideimg1.png';
import slide2 from '../assets/slideimg2.png';
import slide3 from '../assets/slideimg3.png';
import slide4 from '../assets/slideimg4.png';

import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ScrollItem = props => {
  return (
    <View style={styles.sliderItem}>
      <View
        style={{
          height: '70%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={props.imgLink}
          style={{width: '110%', resizeMode: 'contain'}}
        />
      </View>

      <View
        style={{height: '18%', width: '100%', backgroundColor: 'transparent'}}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Raleway-SemiBold',
            fontSize: 16,
          }}>
          {props.text}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Raleway-Regular',
            fontSize: 10,
            marginTop: 4,
          }}>
          {props.sideText}
        </Text>
      </View>
      <View style={{height: '10%', width: '100%'}}>
        {props.btn ? (
          <Button
            name={'Sign Up'}
            action={() => {
              props.btn();
            }}
            styles={{width: '90%', height: '92%'}}
            textStyle={{fontFamily: 'Raleway-Regular'}}
          />
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const AuthPage = props => {
  const onSignUpClick = () => {
    props.navigation.navigate('SignUp');
  };

  const onSignInClick = () => {
    props.navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" style={{backgroundColor: 'white'}} />

      {/* <Text style={{color: 'red'}}>Server Error</Text> */}

      <Logo />

      <View
        style={{
          backgroundColor: 'transparent',
          height: hp('65%'),
          marginTop: hp('1%'),
        }}>
        <ScrollView horizontal={true}>
          <View
            style={{
              height: hp('65%'),
              width: wp('5%'),
              margin: wp('2.5%'),
            }}></View>
          <ScrollItem
            imgLink={slide1}
            text={
              'Earning residual income shouldn’t sound like rocket science!'
            }
            sideText={
              'Yes, we said that. Perform in-app tasks and start earning'
            }
          />
          <ScrollItem
            imgLink={slide2}
            text={'You are as free as a bird!'}
            sideText={'Withdraw, recharge and paybills at your convenience'}
          />
          <ScrollItem
            imgLink={slide4}
            text={'Flip cards to cash!'}
            sideText={'Flip airtime, and gift cards to cash at amazing rates.'}
          />
          <ScrollItem
            imgLink={slide3}
            text={'Earn 5% of your referal’s earnings for 6 months!'}
            btn={onSignUpClick}
            sideText={'Exciting right? We are for real, spread the word now.'}
          />

          <View
            style={{
              height: hp('65%'),
              width: wp('5%'),
              margin: wp('2.5%'),
            }}></View>
        </ScrollView>
      </View>

      <View
        style={{
          height: hp('18%'),
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '40%',
          }}>
          <MatIcons
            name={'chevron-double-left'}
            size={30}
            color={'#1D0C4799'}
            style={{margin: 10}}
          />

          <Text style={styles.text}>Swipe</Text>

          <MatIcons
            name={'chevron-double-right'}
            size={30}
            color={'#1D0C4799'}
            style={{margin: 10, fontWeight: '100'}}
          />
        </View>

        <TouchableOpacity style={{marginBottom: 15}} onPress={onSignInClick} >
          <Text style={{color: '#1E0A9Dcc'}} >Already have an account? login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
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

export default AuthPage;
