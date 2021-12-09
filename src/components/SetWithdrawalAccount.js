import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
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
import {Picker} from '@react-native-community/picker';

import {apiConfig, client} from '../config/axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from './helpers/header';
import Button from './helpers/button';
import Input from './helpers/inputField';

const SetWithdrawalAccount = props => {
  // const value = useSelector(state => state.countdown);
  const dispatch = useDispatch();

  const [acctName, setAcctName] = useState();
  const [acctNo, setAcctNo] = useState();
  const [bank, setBank] = useState();

  const [bankList, setBankList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAccount(phoneNumber) {
    axios
      .post(apiConfig.baseUrl + 'transaction/getaccount', {
        userId: props.user.userId,
      })
      .then(response => {
        let res = response.data.data;

        switch (response.status + '') {
          case '200':
            setAcctName(res.accountName);
            setAcctNo(res.accountNo);
            setBank(res.bank);
            break;
          case '401':
            console.log('user account not found');
            break;
          case '400':
            console.log('user account not found');
            break;
          default:
        }
      });
  }

  async function getAccountName(phoneNumber) {
    axios
      .get(
        `https://api.paystack.co/bank/resolve?account_number=${acctNo}&bank_code=${bank.code}`,
        {
          headers: {
            Authorization: `Bearer ${apiConfig.payStackSecret}`,
          },
        },
      )
      .then(response => {
        let res = response.data.data;

        console.warn(res);
        switch (response.status + '') {
          case '200':
            setAcctName(res.account_name);
            break;
          case '401':
            console.log('user account not found');
            break;
          case '400':
            console.log('incorrect username or password');
            break;
          default:
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function setAccount(phoneNumber) {
    // setLoading(true);
    axios
      .post(apiConfig.baseUrl + 'transaction/updatebank', {
        userId: props.user.userId,
        accountName: acctName,
        accountNo: acctNo,
        bank,
      })
      .then(response => {
        let res = response.data;

        switch (response.status + '') {
          case '200':
            setLoading(false);
            console.warn('ogago');
            break;
          case '401':
            console.log('user account not found');
            break;
          case '400':
            console.log('incorrect username or password');
            break;
          default:
        }
      });
  }

  async function getBankList() {
    axios
      .get('https://api.paystack.co/bank', {
        headers: {
          Authorization: `Bearer ${apiConfig.payStackSecret}`,
        },
      })
      .then(response => {
        let res = response.data.data;

        switch (response.status + '') {
          case '200':
            setBankList(res);
            break;
          case '401':
            console.log('user account not found');
            break;
          case '400':
            console.log('incorrect username or password');
            break;
          default:
        }
      });
  }

  async function initiatePayout() {
    setLoading(true);
    await axios
      .post(
        'https://api.paystack.co/transferrecipient',
        {
          type: 'nuban',
          name: acctName,
          account_number: acctNo,
          bank_code: bank.code,
          currency: 'NGN',
        },
        {
          headers: {
            Authorization: `Bearer ${apiConfig.payStackSecret}`,
          },
        },
      )
      .then(response => {
        let res = response.data.data;

        switch (response.status + '') {
          case '201':
            initiateTransfer(res.recipient_code)
            break;
          case '401':
            console.log('user account not found');
            break;
          case '400':
            console.log('incorrect username or password');
            break;
          default:
        }
      });
  }

  async function initiateTransfer(recipient) {

    await axios
    .post(
      'https://api.paystack.co/transfer',
      {
        source: 'balance',
        amount: "20000",
        recipient,
        reason: 'paystrapp cashout'
      },
      {
        headers: {
          Authorization: `Bearer ${apiConfig.payStackSecret}`,
        },
      },
    )
    .then(response => {
      let res = response.data.data;

      switch (response.status + '') {
        case '201':
          break;
        case '401':
          console.log('user account not found');
          break;
        case '400':
          console.log('incorrect username or password');
          break;
        default:
      }
    });

  }

  useEffect(() => {
    getAccount();
    getBankList();
  }, []);

  useEffect(() => {
    if (bank && acctNo) {
      getAccountName();
    }
  }, [acctNo, bank]);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <Header
          title={props.route.params ? props.route.params.payout : 'Settings'}
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
            {props.route.params !== undefined ? '' : 'Edit Withdrawal account'}
          </Text>
        </View>

        <View style={styles.adCont}>
          <Input
            label={'Account No'}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter Account No"
            placeholderTextColor="#1D0C47A0"
            value={acctNo}
            disabled={props.route.params}
            onChangeText={value => setAcctNo(value)}
            errorMessage={'this.state.emailError'}
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
                borderColor:
                  props.route.params !== undefined ? '#cccccc' : '#FF910099',
              },
            ]}>
            <Picker
              selectedValue={bank}
              enabled={props.route.params === undefined}
              style={{
                backgroundColor: 'transparent',
                height: 45,
              }}
              itemStyle={{backgroundColor: 'blue'}}
              value={bank}
              onValueChange={(itemValue, itemIndex) => setBank(itemValue)}>
              <Picker.Item label="Select Bank" />
              {bankList.map((item, index) => {
                return (
                  <Picker.Item color="white" label={item.name} value={item} />
                );
              })}
            </Picker>
          </View>

          <Input
            label={'Account Name'}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Enter Acount Name"
            placeholderTextColor="#1D0C47A0"
            disabled={true}
            value={acctName}
            // onChangeText={value => setAcctName(acctName)}
            // errorMessage={this.state.emailError}
            onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
            // onSubmitEditing={() => this.refs.formInputPassword.focus()}
          />
        </View>

        <View>
          <Button
            name={'Proceed'}
            styles={{minHeight: 40, marginTop: 100}}
            action={() => {
              if (props.route.params !== undefined) {
                initiatePayout();
              } else {
                setAccount();
              }
            }}
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
    borderWidth: 1,
    borderColor: '#FF910099',
    padding: 10,
    borderRadius: 5,
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

export default connect(mapStateToProps)(SetWithdrawalAccount);
