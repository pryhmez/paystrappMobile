import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
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
// import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  AdEventType,
} from '@react-native-firebase/admob';
import MyModal from './helpers/myModal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

const Earn = props => {
  // const value = useSelector(state => state.countdown);
  const dispatch = useDispatch();

  const [sessionComplete, setSessionComplete] = useState(!true);

  // const { hours = 0, minutes = 0, seconds = 60 } = {hours: 00, minutes: 00, seconds: 00};
  const [[hrs, mins, secs], setTime] = useState([0, 10, 10]);
  const [loaded, setLoaded] = useState(false);
  const [event, setEvent] = useState();
  const [vpnOn, setVpnOn] = useState(false);

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

      if (type === AdEventType.LOADED) {
        setLoaded(true);
      } else {
        setLoaded(false);
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

  showAlertBox = () => {
    Alert.alert(
      'Attention',
      'Please turn on your vpn as it would help us track your earning better' +
        '.',
      [{text: 'OK'}],
      {cancelable: false},
    );
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

  useEffect(() => {
    // const timerId = setInterval(() => tick(), 1000);
    // return () => clearInterval(timerId);
    if (props.countdown.count % 2 == 0) {
      setSessionComplete(false);
    } else {
      setSessionComplete(true);
    }
  });

  useEffect(() => {
    const sec = parseInt(props.countdown.timer, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60;
    setTime([hours, minutes, seconds]);
    // console.log(hours, minutes, secs)
  }, [props.countdown.timer]);

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
        <MyModal
          modalVisible={!vpnOn}
          containerStyle={{width: '100%'}}
          modalStyle={{width: wp('80%'), borderColor: '#FF910099', justifyContent: 'center'}}>
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
 
          <View style={{ width: '100%', marginTop: 10}}>
            <Text style={{fontFamily: 'Raleway-Regular', fontSize: 15, textAlign: 'justify' }}>
              We recomended you use Thunder VPN and set your preferred server to
              the United States to get the best experience.{' '}
            </Text>
          </View>
        </MyModal>

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
          {sessionComplete ? (
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
                style={styles.btn}
                onPress={() => props.navigation.navigate('Dashboard')}>
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
                  title="Start Session"
                  disabled={!loaded}
                  onPress={() => {
                    if (!vpnOn) {
                      showToastWithGravityAndOffset;
                    } else {
                      interstitial.show();
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

export default connect(mapStateToProps)(Earn);
