import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

import {connect, useDispatch, useSelector} from 'react-redux';

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
            // errorMessage={this.state.emailError}
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
            // errorMessage={this.state.emailError}
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
            // errorMessage={this.state.emailError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />
             </View>

          <View>
            <Button
              name={'Proceed'}
              styles={{minHeight: 40, marginTop: 100}}
              action={() => props.navigation.navigate('Verify')}
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
    justifyContent: 'space-evenly'
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
