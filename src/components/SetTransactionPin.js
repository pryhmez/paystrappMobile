import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import axios from 'axios';
import { addUser, setPin } from '../actions/user';

import Button from './helpers/button';
import Logo from './helpers/logo';
import Success from './helpers/success';
import { apiConfig, client } from '../config/axios';
const CELL_COUNT = 4;

const SetTransactionPin = prop => {
  const [value, setValue] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [phone, setPhone] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  async function setPin() {
    axios
    .post(apiConfig.baseUrl + 'auth/settransactionpin', {
      email: prop.user.email,
      pin: value,
    })
    .then(response => {
      let res = response.data;

      console.log(res)
      prop.addUser(
          prop.user.token,
          res.data._id,
          res.data.email,
          res.data.firstName,
          res.data.lastName,
          res.data.emailVerified,
          res.data.phoneVerified,
          res.data.accountBalance,
          res.data.transactionPin
        )
  })

}

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1c" />
      {/* <View style={styles.container}>
            <View style={styles.appBarContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'ios-arrow-round-back'} size={27} color={'white'} />
                </TouchableOpacity>
            </View> */}

      <View style={styles.mainContainer}>
        <Logo />
        {
          // sent
          !confirm ? (
            <>
              <View style={{marginBottom: 10, height: '20%', width: '100%'}}>
                <Text style={styles.headerTxt}>Set Transaction Pin</Text>
                <Text style={{...styles.title}}>
                  This pin will be required for all transactions.
                </Text>
                <Text style={{...styles.title, color: 'white'}}>{phone}</Text>
              </View>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                renderCell={({index, symbol, isFocused}) => {
                  if (value.length == prop.cellcount) {
                    () => confirmCode();
                    prop.sendPhone(phone);
                    return;
                  }
                  // console.warn(value.length, prop.cellcount)
                  return (
                    <Text
                      key={index}
                      style={[
                        styles.cell,
                        value.length >= index + 1 && styles.focusCell,
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  );
                }}
              />

              <Button
                name={'Confirm'}
                styles={{marginTop: 50, height: 40}}
                indicator={false}
                action={() => setPin(value)}></Button>
              <TouchableOpacity
                style={{
                  marginTop: 40,
                  justifyContent: 'center',
                  width: '100%',
                  flexDirection: 'row',
                }}
                onPress={() => signInWithPhoneNumber(phone)}>
                <Text style={{color: '#1D0C47'}}>Resend</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Success
                src={require('../assets/confirm.png')}
                title={'Success!'}
              />
            </>
          )
        }
      </View>

      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '85%',
    alignSelf: 'center',
    marginTop: '3%',
    alignItems: 'center',
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#1D0C47',

    marginTop: '10%',
  },
  appBarContainer: {
    backgroundColor: 'transparent',
    height: 49,
    justifyContent: 'center',
  },
  backBtn: {
    marginLeft: 14,
  },
  root: {flex: 1, padding: 20},
  title: {fontSize: 15, color: '#1D0C47'},
  codeFiledRoot: {marginTop: 20, width: '80%'},
  cell: {
    width: 30,
    height: 60,
    lineHeight: 70,
    color: '#1a1a1c',
    fontSize: 30,
    borderTopWidth: 0,
    borderLeftColor: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#1D0C47',
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 5,
  },
  focusCell: {
    borderColor: '#19191B',
    backgroundColor: 'white',
  },
  inputBox: {
    width: '100%',
    fontSize: 16,
    color: '#403F45',
  },
  btn: {
    width: '100%',
    height: 40,
    marginTop: '10%',
    backgroundColor: '#EE5859',
    borderRadius: 30,
    marginVertical: 10,
    paddingVertical: 12,
    elevation: 200,
    justifyContent: 'center',
  },
  SignUpText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 15,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {addUser, setPin})(SetTransactionPin);
