import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import { apiConfig } from '../config/axios';
import {Picker} from '@react-native-community/picker';
import Input from './helpers/inputField';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BlueBtn from './helpers/button';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from './helpers/lightButton';
import Header from './helpers/header';
import PaperModal from './helpers/PaperModal';
import InputTransactionPin from './helpers/inputTransactionPin';

const AirtimeRecharge = props => {
  const [phoneNo, setPhoneNo] = useState();
  const [amount, setAmount] = useState();
  const [provider, setProvider] = useState();
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState();
  const [loading, setLoading] = useState(false);

  initiateTransaction = () => {
    // const params = new URLSearchParams();
    // params.append('operator', provider);
    // params.append('type', 'airtime');
    // params.append('value', amount);
    // params.append('phone', phoneNo);

    axios
      .post(
        apiConfig.baseUrl + 'transaction/airtimepurchase',
        {
          userId: props.user.userId,
          email: props.user.email,
          provider,
          amount,
          phone: phoneNo
        },
        {
          headers: {
            'pin': pin
          },
        },
      )
      .then(res => {
        setLoading(false);
        console.warn(res.data);
      })
      .catch(err => {
        setLoading(false)
        console.warn(err);

      });
  };

  checkBalance = () => {};

  updateTransaction = () => {};

  verify = () => {
    setVerified(true)
  }

  addPin = async (pin) => {
    // console.log(pin)
    await setPin(pin);
    setVerified(false)
    await setLoading(true);
    await initiateTransaction();
  }
  
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
        />

        <PaperModal show={verified} >
          <InputTransactionPin collectPin={addPin}/>
        </PaperModal>

      <View style={styles.container}>
        <Header
          title={'Recharge Airtime '}
          backBtn={true}
          backAction={() => props.navigation.goBack()}
          />

        <View style={styles.adCont}>
          <Input
            label="Phone"
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter phone number"
            placeholderTextColor="#1D0C47A0"
            value={phoneNo}
            onChangeText={value => setPhoneNo(value)}
            // errorMessage={this.state.emailError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />

          <Input
            label="Amount"
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter Amount"
            placeholderTextColor="#1D0C47A0"
            value={amount}
            onChangeText={value => setAmount(value)}
            // errorMessage={this.state.emailError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />

          <View
            style={[
              styles.input,
              {
                padding: 0,
                minHeight: 45,
                marginTop: 15,
                marginLeft: 15,
                width: '90%',
              },
            ]}>
            <Picker
              selectedValue={provider}
              style={{
                backgroundColor: 'transparent',
                // height: '100%'
              }}
              itemStyle={{backgroundColor: 'blue', color: 'green'}}
              onValueChange={(itemValue, itemIndex) => setProvider(itemValue)}>
              <Picker.Item label="Choose network" />
              <Picker.Item label="MTN" value="MTN" />
              <Picker.Item label="9mobile" value="9mobile" />
              <Picker.Item label="Airtel" value="Airtel" />
              <Picker.Item label="Glo" value="Glo" color={'white'} />
            </Picker>
          </View>
        </View>
        <BlueBtn
          styles={{width: '70%', height: 40}}
          name={'Proceed'}
          action={() => verify()}
          indicator={loading}
        />
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
    width: '90%',
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
  adCont: {
    height: hp('37%'),
    width: '100%',
    // alignItems: 'center',
    // paddingTop: hp('7%'),
    justifyContent: 'space-evenly',
    marginTop: hp('10%'),
  },
  input: {
    width: '100%',
    // flex: 1,
    backgroundColor: 'white',
    borderWidth: 1.2,
    borderColor: '#FF9100',
    padding: 10,
    borderRadius: 7,
    // backgroundColor: 'brown'
  },
  inputContainer: {
    borderColor: 'transparent',
    width: '100%',
    alignItems: 'center',
    //  backgroundColor: 'red',
    //  marginBottom: 0,
    //  marginTop: 0,
    padding: 0,
    marginHorizontal: 0,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    countdown: state.countdown,
  };
};

export default connect(mapStateToProps)(AirtimeRecharge);
