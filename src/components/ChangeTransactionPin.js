import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

import {connect, useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { apiConfig  } from '../config/axios';

import Header from './helpers/header';
import Input from './helpers/inputField';
import Button from './helpers/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChangeTransactionPin = props => {
  const [pin, setPin] = useState();
  const [newPin, setNewPin] = useState();
  const [confirmPin, setConfirmPin] = useState();
  const [loading, setLoading] = useState();
  const [pinError, setPinError] = useState();
  const [newPinError, setNewPinError] = useState();
  const [confirmPinError, setConfirmPinError] = useState();

  addPin = () => {
    setLoading(true)
    setPinError(false)
    setNewPinError(false)
    setConfirmPinError(false)
    if (pin.length != 4) {
      setLoading(false)
      setPinError("Pin must be a 4 digit number.")
    } else if (newPin.length != 4) {
      setLoading(false)
      setNewPinError("New pin must be a 4 digit number")
    } else if (newPin !== confirmPin) {
      setLoading(false)
      setConfirmPinError("Pin mismatch")
    } else {
      axios
        .post(
          apiConfig.baseUrl + 'transaction/changetransactionpin',
          {
            userId: props.user.userId,
            email: props.user.email,
            newPin,
          },
          {
            headers: {
              pin: pin,
            },
          },
        )
        .then(res => {
          setLoading(false);
          console.warn(res.data);
        })
        .catch(err => {
          setLoading(false);
          console.warn(err.response);
        });
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Header
          backBtn
          title={'Settings'}
          backAction={() => props.navigation.goBack()}
        />

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp('8%'),
          }}>
          <Text style={{fontSize: 20, fontWeight: '400'}}>
            Change Transaction Pin{' '}
          </Text>
        </View>

        <View style={styles.adCont}>
          <Input
            label={'Pin'}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter Current Pin"
            placeholderTextColor="#1D0C47A0"
            value={pin}
            onChangeText={value => setPin(value)}
            error={pinError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />

          <Input
            label={'New Pin'}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter New Pin"
            placeholderTextColor="#1D0C47A0"
            value={newPin}
            onChangeText={value => setNewPin(value)}
            error={newPinError}
            secureTextEntry={true}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />

          <Input
            label={'Confirm Pin'}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Re-enter New Pin"
            placeholderTextColor="#1D0C47A0"
            value={confirmPin}
            onChangeText={value => setConfirmPin(value)}
            error={confirmPinError}
            secureTextEntry={true}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />
        </View>

        <View>
          <Button
            name={'Proceed'}
            styles={{minHeight: 40, marginTop: 100}}
            action={() => addPin()}
            indicator={loading}
          />
        </View>
      </View>
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
    //   backgroundColor: 'red',
  },
  adCont: {
    height: hp('37%'),
    width: '100%',
    justifyContent: 'center',
    //  paddingTop: hp('3%'),
    //  backgroundColor: 'green',
    justifyContent: 'space-evenly',
  },
  adHolder: {
    backgroundColor: '#E7E7E7',
    height: '100%',
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    countdown: state.countdown,
  };
};

export default connect(mapStateToProps)(ChangeTransactionPin);
