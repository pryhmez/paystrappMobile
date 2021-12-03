import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Input} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import BlueBtn from './helpers/button';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from './helpers/lightButton';
import Header from './helpers/header';

const AirtimeRecharge = props => {
  const [phoneNo, setPhoneNo] = useState();
  const [amount, setAmount] = useState();
  const [provider, setProvider] = useState();

  initiateTransaction = () => {
    console.warn(provider, phoneNo, amount)
    const params = new URLSearchParams();
    params.append('operator', provider);
    params.append('type', 'airtime');
    params.append('value', amount);
    params.append('phone', phoneNo);

    axios
      .post(
        'https://api.mobilevtu.com/v1/MAnsKL9byXCiQ48yFPjxOSUNruUH/topup',
        // 'https://paystrapp.com/api/auth/signin',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Api-Token': `EqGBn90bqtSgaqMAjJGOyrfgRysL`,
            'Request-Id': '34232',
          },
        },
      )
      .then(res => {
        console.warn(res.data);
      })
      .catch(err => {});
  };

  checkBalance = () => {};

  updateTransaction = () => {};

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <Header
          title={'Recharge Airtime '}
          backBtn={true}
          backAction={() => props.navigation.goBack()}
        />

        <View style={styles.adCont}>

          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={{ paddingHorizontal: 0, flex: 1 }}
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
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={{ paddingHorizontal: 0, flex: 1 }}
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

          <View style={{width: '100%', flex: 1}}>

          <View style={[styles.input, { padding: 0, minHeight: 40}]}>
            <Picker
              selectedValue={provider}
              style={{
                backgroundColor: 'transparent',
                // height: '100%'
              }}
              itemStyle={{backgroundColor: 'blue', color: 'green'}}
              onValueChange={(itemValue, itemIndex) => setProvider(itemValue)}>
                <Picker.Item label="Choose network" />
              <Picker.Item label="MTN" value="MTN"  />
              <Picker.Item label="9mobile" value="9mobile" />
              <Picker.Item label="Airtel" value="Airtel" />
              <Picker.Item label="Glo" value="Glo" color={"white"} />

            </Picker>
          </View>
          </View>
        </View>
        <BlueBtn
          styles={{width: '70%', height: 40}}
          name={'Proceed'}
          action={() => initiateTransaction()}
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
    height: hp('45%'),
    width: '100%',
    alignItems: 'center',
    paddingTop: hp('7%'),
    justifyContent: 'space-evenly',
   
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
    marginHorizontal: 0
  },
});

export default AirtimeRecharge;
