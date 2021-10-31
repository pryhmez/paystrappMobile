import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from './helpers/lightButton';
import Logo from './helpers/logo';

const Paybills = props => {
  const [sessionComplete, setSessionComplete] = useState(true);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Logo imgStyle={{width: 120}} containerStyle={{width: '40%', height: '100%', alignItems: 'flex-start'}} />
          <TouchableOpacity style={styles.timerBtn}>
            <Text
              style={{
                // fontFamily: 'Raleway-Medium',
                fontSize: 20,
                color: '#1D0C47',
              }}>
              Bill Payment
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.adCont}>
          <Button>
            <Text style={{color: '#1D0C47', fontSize: 20}}>Cable TV</Text>
            <FontAwesome
              name={'angle-double-right'}
              size={35}
              color={'#1D0C47'}
            />
          </Button>

          <Button>
            <Text style={{color: '#1D0C47', fontSize: 20}}>Electricity</Text>
            <FontAwesome
              name={'angle-double-right'}
              size={35}
              color={'#1D0C47'}
            />
          </Button>

          <Button>
            <Text style={{color: '#1D0C47', fontSize: 20}}>
              Airtime Recharge
            </Text>
            <FontAwesome
              name={'angle-double-right'}
              size={35}
              color={'#1D0C47'}
            />
          </Button>
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
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'flex-end',
    // justifyContent: '',
    padding: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  timerBtn: {
    width: '60%',
    height: '100%',
    borderColor: '#FF9100',
    borderWidth: 1,
    maxHeight: 45,
    borderRadius: 7,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adCont: {
    height: hp('45%'),
    width: '100%',
    alignItems: 'center',
    paddingTop: hp('7%'),
    justifyContent: 'space-evenly',
  },
  adHolder: {
    backgroundColor: '#E7E7E7',
    height: '100%',
    padding: 10,
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

export default Paybills;
