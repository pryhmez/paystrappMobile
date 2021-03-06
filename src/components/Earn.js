import React, {useState, useEffect, useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getUserProfile} from '../actions/user';

import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import {Tooltip} from 'react-native-elements';
import Popover from 'react-native-popover-view';
// import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  AdEventType,
} from '@react-native-firebase/admob';
import MyModal from './helpers/myModal';
import PaperModal from './helpers/PaperModal';
import {socket, connectFunction} from '../config/socketConfig';
import notifee, {
  TimestampTrigger,
  TriggerType,
  IntervalTrigger,
  TimeUnit,
  AndroidImportance,
} from '@notifee/react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const interstitial = InterstitialAd.createForAdRequest(
  'ca-app-pub-5968472501012397/5915097117',
);
// const interstitial = RewardedAd.createForAdRequest(TestIds.REWARDED);

const Earn = props => {
  // const value = useSelector(state => state.countdown);
  const dispatch = useDispatch();
  const touchable = useRef();
  const clearer = useRef();
  const [showPopover, setShowPopover] = useState(false);
  let viewClocker;

  const [sessionComplete, setSessionComplete] = useState(!true);

  // const { hours = 0, minutes = 0, seconds = 60 } = {hours: 00, minutes: 00, seconds: 00};
  const [[hrs, mins, secs], setTime] = useState([0, 10, 10]);
  const [checkLoaded, setCheckLoaded] = useState();
  const [loaded, setLoaded] = useState(false);
  const [event, setEvent] = useState();
  const [vpnOn, setVpnOn] = useState(false);
  const [hideModal, setHideModal] = useState(true);
  const [startTime, setStartTime] = useState();
  const [viewTime, setViewTime] = useState();
  let startT = 0;

  useEffect(() => {
    const sec = parseInt(props.countdown.timer, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60;
    setTime([hours, minutes, seconds]);
    // console.log(hours, minutes, secs)
  }, [props.countdown.timer]);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.warn('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (state.type === 'vpn') {
        setVpnOn(true);
      } else {
        setVpnOn(false);
      }
    });

    const eventListener = interstitial.onAdEvent(type => {
      setEvent(type);
      console.log(type);
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      } else {
        setLoaded(false);
        interstitial.load();
      }

      if (type === AdEventType.OPENED) {
        const time = new Date().getTime();
        startT = time;
      }

      if (type === AdEventType.CLOSED) {
        const time = new Date().getTime();
        const millis = time - startT;
        // console.log(Math.floor(millis / 1000));
        socket.emit('VIEW', {
          userId: props.user.userId,
          viewTime: Math.floor(1000 / 1000),
        });
        props.getUserProfile(
          props.user.email,
          props.user.token,
          props.user.userId,
        );
        interstitial.load();
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (checkLoaded == true) {
      if (props.countdown.count % 2 == 0) {
        onDisplayNotification(
          'Session Ended',
          'Check back in',
          'to continue earning',
        );
        onCreateTriggerNotification();
      } else {
        setTimeout(() => {
          onDisplayNotification(
            'Session started',
            'This session will last for',
            'HAPPY EARNING',
          );

          onCreateTriggerNotification();
        }, 1000);
      }
    }
  }, [checkLoaded]);

  showAd = async () => {
    await interstitial.show();
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Please turn on your vpn as it would help us track your earning better',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  async function onCreateTriggerNotification() {
    // const channelId = await notifee.createChannel({
    //   id: 'earn',
    //   name: 'earn channel',
    //   importance: AndroidImportance.HIGH,
    // });

    const sec = parseInt(props.countdown.timer, 10); // convert value to number if it's string

    // const date = new Date(Date.now());
    // date.setHours(Math.floor(sec / 3600));
    // date.setMinutes(57);

    //Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 1000 * (sec - 200),
      // timestamp: Date.now() + 30 * 1000,
      repeatFrequency: RepeatFrequency.WEEKLY
    };

    await notifee.createTriggerNotification(
      {
        title: 'New Earning session',
        body: 'Hey champ your new earning session has started return to app to earn more.',
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
          smallIcon: 'my_logo',
          largeIcon:
            'https://res.cloudinary.com/sentinelprime/image/upload/c_scale,w_222/v1643758309/Group_42_2_pawthz.png',
          actions: [
            {
              pressAction: {id: 'earnnow'},
              title: 'Earn Now',
              launchActivity: 'default',
            },
            {pressAction: {id: 'later'}, title: 'Later'},
          ],
        },
      },
      trigger,
    );

    await notifee
      .getTriggerNotificationIds()
      .then(ids => console.warn('All trigger notifications: ', ids));

    // console.warn(sec)
  }

  async function onDisplayNotification(title, text1, text2) {
    await notifee.requestPermission();
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title,
      body: `${text1}
      ${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}
      ${text2}`,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'my_logo',
        largeIcon:
          'https://res.cloudinary.com/sentinelprime/image/upload/c_scale,w_222/v1643758309/Group_42_2_pawthz.png',
        actions: [
          {
            pressAction: {id: 'earnnow'},
            title: 'Earn Now',
            launchActivity: 'default',
          },
          {pressAction: {id: 'later'}, title: 'Later'},
        ],
      },
    });
  }

  useEffect(() => {
    // const timerId = setInterval(() => tick(), 1000);
    // return () => clearInterval(timerId);
    if (props.countdown.count % 2 == 0) {
      setSessionComplete(false);
    } else {
      setSessionComplete(true);
    }
    setCheckLoaded(true);
  });

  // No advert ready to show yet
  // if (!vpnOn) {
  //   return showAlertBox();
  // }

  // return (
  //   <Button
  //     title="Show Interstitial"
  //     onPress={() => {
  //       interstitial.show();
  //     }}
  //   />
  // );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <Popover
          from={touchable}
          isVisible={!showPopover && vpnOn && sessionComplete}
          popoverStyle={{
            borderRadius: 7,
          }}
          onRequestClose={() => setShowPopover(!false)}>
          <View
            style={{
              height: 45,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderColor: '#FF9100',
              borderWidth: 1,
              borderRadius: 7,
            }}>
            <Text>
              Click Here When it turns blue to start your earning streak
            </Text>
          </View>
        </Popover>

        {!vpnOn && (
          <PaperModal
            show={!vpnOn}
            onDismiss={() => {
              setVpnOn(!vpnOn);
              console.warn('closing');
            }}
            // visible={vpnOn}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 20,
              width: '85%',
              alignSelf: 'center',
              height: '20%',
              borderRadius: 10,
              borderColor: '#FF910099',
              justifyContent: 'center',
              borderWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name={'ios-warning-outline'}
                size={30}
                color={'#FF0000'}
              />
              <Text style={{fontFamily: 'Raleway-Regular', fontSize: 17}}>
                OOPS! please turn on a VPN.
              </Text>
            </View>

            <View style={{width: '100%', marginTop: 10}}>
              <Text
                style={{
                  fontFamily: 'Raleway-Regular',
                  fontSize: 15,
                  textAlign: 'justify',
                }}>
                We recomended you use Thunder VPN and set your preferred server
                to the United States to get the best experience.{' '}
              </Text>
            </View>

            {/* <TouchableOpacity onPress={() => console.warn('!vpnOn')} style={{backgroundColor: 'red', width: '100%', height: 20}}>
            <Ionicons
              name={'ios-warning-outline'}
              size={30}
              color={'#FF0000'}
            />
            </TouchableOpacity> */}
          </PaperModal>
        )}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.timerBtn}>
            <Ionicons
              name={'ios-stopwatch-outline'}
              size={30}
              color={'#1D0C47'}
            />

            <Text
              style={{
                fontFamily: 'Raleway-Medium',
                fontSize: 26,
                color: '#1D0C47',
                height: '100%',
              }}>
              {`${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.adCont}>
          {!sessionComplete ? (
            <View style={styles.sessionHolder}>
              <Text
                style={{
                  color: '#1D0C47',
                  fontSize: wp('10%'),
                  fontFamily: 'Nunito Sans',
                  textAlign: 'center',
                }}>
                Session Complete!
              </Text>
              <Text
                style={{
                  color: '#1D0C47',
                  fontSize: wp('4.5%'),
                  textAlign: 'center',
                }}>
                Check back in{' '}
                {`${hrs.toString().padStart(2, '0')}:${mins
                  .toString()
                  .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}{' '}
                for a new earning session
              </Text>
              <TouchableOpacity
                ref={touchable}
                style={styles.btn}
                onPress={() => props.navigation.navigate('Dashboard')}>
                {/* onPress={() => onDisplayNotification()}> */}

                <Text style={{color: 'white', fontFamily: 'Raleway-Regular'}}>
                  Go To Home
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.adHolder}>
              <Ionicons
                name={'ios-close'}
                size={30}
                color={'black'}
                style={{position: 'absolute', zIndex: 10}}
              />

              <View style={{height: '100%'}}>
                <ActivityIndicator
                  style={{position: 'absolute', top: '49%', left: '49%'}}
                  color="#FF9100"
                  size="large"
                />
                {/* <BannerAd
                  unitId={TestIds.BANNER}
                  size={`${wp('88%')}x${hp('77%')}`}
                  onAdOpened={() => {
                    console.warn("add opened")
                  }}
                  onAdFailedToLoad={(error) => {
                    console.warn('Advert failed to load: ', error);}}
                /> */}

                <Button
                  ref={touchable}
                  title="Start Session"
                  // disabled={!loaded}
                  onPress={() => {
                    if (!vpnOn) {
                      showToastWithGravityAndOffset;
                    } else {
                      showAd();
                      // interstitial.show();
                    }
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.text}>Hello from notification</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '88%',
    // backgroundColor: 'red',
  },
  btnContainer: {
    height: hp('12.5%'),
    width: '100%',
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
    paddingRight: 0,
  },
  timerBtn: {
    width: '75%',
    height: '100%',
    borderColor: '#FF910099',
    borderWidth: 1,
    maxHeight: 45,
    borderRadius: 7,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adCont: {
    height: hp('77%'),
    width: '100%',
    justifyContent: 'center',
  },
  adHolder: {
    backgroundColor: '#E7E7E7',
    height: '100%',
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  sessionHolder: {
    alignItems: 'center',
  },
  btn: {
    width: wp('70%'),
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: hp('15%'),
    backgroundColor: '#1D0C47',
    borderRadius: 10,
    // marginVertical: 10,
    // paddingVertical: 12,
    elevation: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'blue',
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    countdown: state.countdown,
  };
};

export default connect(mapStateToProps, {getUserProfile})(Earn);
