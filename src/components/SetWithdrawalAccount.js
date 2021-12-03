import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  NativeEventEmitter,
} from 'react-native';
import {Input} from 'react-native-elements';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from './helpers/header';

import Button from './helpers/button';

const SetWithdrawalAccount = props => {
  // const value = useSelector(state => state.countdown);
  const dispatch = useDispatch();

  const [sessionComplete, setSessionComplete] = useState(!true);
  const [acctName, setAcctName] = useState();
  const [acctNo, setAcctNo] = useState();
  const [bank, setBank] = useState();

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <Header
          title={'Settings'}
          backBtn={true}
          backAction={() => props.navigation.goBack()}
        />

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp('10%'),
          }}>
          <Text style={{fontSize: 20, fontWeight: '400'}}>
            Edit Withdrawal account
          </Text>
        </View>

        <View style={styles.adCont}>
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={{paddingHorizontal: 0, flex: 1}}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter Acount Name"
            placeholderTextColor="#1D0C47A0"
            value={acctName}
            onChangeText={value => setAcctName(value)}
            // errorMessage={this.state.emailError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />

          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={{paddingHorizontal: 0, flex: 1}}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter Account No"
            placeholderTextColor="#1D0C47A0"
            value={acctNo}
            onChangeText={value => setAcctNo(value)}
            // errorMessage={this.state.emailError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />

          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={{paddingHorizontal: 0, flex: 1}}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter Bank"
            placeholderTextColor="#1D0C47A0"
            value={bank}
            onChangeText={value => setBank(value)}
            // errorMessage={this.state.emailError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />
        </View>

        <View>
          <Button
            name={'Proceed'}
            styles={{minHeight: 40, marginTop: 100}}
            action={() => props.navigation.navigate('Tabs')}
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
  input: {
    width: '100%',
    // flex: 1,
    backgroundColor: 'white',
    borderWidth: 1.2,
    borderColor: '#FF910099',
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
  adCont: {
    height: hp('37%'),
    width: '100%',
    justifyContent: 'center',
    paddingTop: hp('3%'),
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

export default connect(mapStateToProps)(SetWithdrawalAccount);
