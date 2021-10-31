import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import { socket } from "../config/socketConfig";

import user from '../reducers/user';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Dashboard = props => {

  const [[hrs, mins, secs], setTime] = useState([0, 10, 10]);

  useEffect(() => {

    socket.on("INCOMING_SLOT", (data, cb) => {
      console.warn(data);
      cb("recieved")
  });

  }, [])

  useEffect(() => {
    const sec = parseInt(props.countdown.timer, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60);
    setTime([hours, minutes, seconds]);
  }, [props.countdown.timer])

  return (
    <View style={styles.pageContainer}>
      <StatusBar barStyle="dark-content" style={{backgroundColor: 'white'}}/>

      <View style={styles.welcomeText}>
        <View
          style={{
            width: wp('88%'),
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 22}}>
            Welcome {props.user.firstName ? props.user.firstName : 'John'},
          </Text>

          <TouchableOpacity>
            <Ionicons
              name={'ios-settings-outline'}
              size={27}
              color={'#1D0C47'}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.console}>
        <ScrollView horizontal={true} style={{marginLeft: wp('5%')}}>
          <View style={styles.slideCard}>
            <View style={styles.slideContainer}>
              <View style={styles.balanceCont}>
                <Text style={{color: 'white', fontFamily: 'Raleway-SemiBold'}}>
                  Wallet balance
                </Text>
                <Text
                  style={{
                    color: '#028802',
                    fontFamily: 'Raleway-Medium',
                    fontSize: 30,
                  }}>
                  $5000
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AwesomeIcons
                    name={'university'}
                    size={15}
                    color={'white'}
                    style={styles.ImageStyle}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      fontFamily: 'Raleway-Medium',
                    }}>
                    Withdraw
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AwesomeIcons
                    name={'money'}
                    size={15}
                    color={'white'}
                    style={styles.ImageStyle}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      fontFamily: 'Raleway-Medium',
                    }}>
                    Fund from bank{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.slideCard, {backgroundColor: 'transparent'}]}>
            <Text>Wallet balance</Text>
            <Text>$5000</Text>
            <View></View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.slider}>
        <ScrollView horizontal={true} style={{marginLeft: wp('5%')}}>
          <View style={[styles.slideCard, {padding: 5}]}>
            <View style={[styles.slideContainer, styles.secondCont]}>
              <Text style={{fontFamily: 'Raleway-Regular'}}>
                Utilize our Investment tool to grow your wealth!
              </Text>
              <Awesome5
                name={'plane-departure'}
                size={15}
                color={'#1E0A9DCC'}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* //countdown section */}
      <View style={styles.countdown}>
        <View style={styles.newSessionCont}>
          <Text style={{fontFamily: 'Raleway-Regular', color: '#1D0C47'}}>
            {
              props.countdown.count % 2 == 0
              ?
              "Your earning session has started"
              :
              "New earning session countdown"

            }
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            height: '37%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: 'Raleway-Medium', fontSize: 26, color: '#1D0C47'}}>
          {`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
          </Text>
        </View>

        <View style={[styles.newSessionCont, {height: '30%'}]}>
          <Text style={{fontFamily: 'Raleway-Regular', color: '#1D0C47'}}>
            Earn 5% of your referal’s earning for 6 months
          </Text>
          <Text style={{fontFamily: 'Raleway-Regular', color: '#1E0A9D'}}>
            Paystrapp.com/user55779
          </Text>
        </View>
      </View>

      <View style={styles.transactionHistory}>
        <View
          style={{
            height: '100%',
            borderRadius: 7,
            backgroundColor: '#1D0C47',
            padding: 2,
          }}>
          <View
            style={{
              width: '100%',
              height: '19%',
              justifyContent: 'center',
              borderBottomColor: '#757575',
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Raleway-Regular',
              }}>
              Recent transactions
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  welcomeText: {
    height: hp('6%'),
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  console: {
    height: hp('22%'),
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    height: hp('9%'),
    // backgroundColor: 'chocolate',
  },
  countdown: {
    height: hp('24%'),
    // backgroundColor: 'orange',
    paddingLeft: wp('7%'),
    paddingRight: wp('7%'),
    justifyContent: 'center',
  },
  transactionHistory: {
    height: hp('33%'),
    // backgroundColor: 'red',
    padding: '7%',
  },
  slideCard: {
    height: '100%',
    // backgroundColor: 'red',
    width: wp('88%'),
    alignItems: 'center',
    padding: 20,
    paddingLeft: wp('2%'),
    paddingRight: 0,
  },
  slideContainer: {
    backgroundColor: '#1D0C47',
    height: '100%',
    width: '100%',
    borderRadius: 7,
  },
  balanceCont: {
    flex: 2,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  secondCont: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF9100',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  newSessionCont: {
    width: '100%',
    backgroundColor: 'transparent',
    height: '20%',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#FF9100CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    countdown: state.countdown
  };
};

export default connect(mapStateToProps)(Dashboard);
