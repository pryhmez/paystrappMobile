import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {signOutUser} from '../actions/user';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from './helpers/header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from './helpers/button';

import LightButton from './helpers/lightButton.js';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Item = props => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
      }}
      onPress={props.action}>
      {props.icon == 'currency-usd-circle-outline' ? (
        <MatIcons
          name={'currency-usd-circle-outline'}
          size={27}
          color={'#FF910099'}
          style={{margin: 10}}
        />
      ) : (
        <Ionicons
          name={props.icon}
          size={27}
          color={'#FF910099'}
          style={{margin: 10}}
        />
      )}

      <Text
        style={{fontSize: 18, fontFamily: 'NunitoSans-Regular', margin: 10}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const Settings = props => {
  // const value = useSelector(state => state.countdown);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  // const { hours = 0, minutes = 0, seconds = 60 } = {hours: 00, minutes: 00, seconds: 00};

  const logOut = () => {};

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'dark-content'}
      />

      <Modal
        animationType="fade"
        transparent={!false}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LightButton
              title={'Reset transaction pin'}
              styles={{width: '100%', justifyContent: 'center'}}
              action={() => {
                setModalVisible(false);
                props.navigation.navigate('Verify');
              }}
            />
            <View
              style={{
                height: 1,
                width: '100%',
                justifyContent: 'center',
                backgroundColor: '#707070',
              }}></View>
            <LightButton
              title={'Change transaction pin'}
              styles={{width: '100%', justifyContent: 'center'}}
              action={() => {
                setModalVisible(!modalVisible);
                props.navigation.navigate('ChangePin');
              }}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <Header title={'Settings'} />

        <View style={{width: '100%'}}>
          <Item
            title={'Bank Account'}
            icon={'currency-usd-circle-outline'}
            action={() => props.navigation.navigate('SetWithdrawalAccount')}
          />
          <Item
            title={'Pin Settings'}
            icon={'key-outline'}
            action={() => setModalVisible(true)}
          />
          <Item
            title={'Wallet Settings'}
            icon={'wallet-outline'}
            action={() => props.navigation.navigate('WalletSettings')}
          />
          <Item
            title={'Log Out'}
            icon={'infinite-outline'}
            action={() => {
              props.signOutUser();
                // props.navigation.navigate('SignIn');
              // props.navigation.navigate()
            }}
          />
        </View>

        <View>
          <Button
            name={'Go to Home'}
            styles={{minHeight: 40, marginTop: 100}}
            action={() => props.navigation.navigate('Tabs')}
          />
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // marginBottom: 50,
    // backgroundColor: 'red'
  },
  modalView: {
    height: hp('25%'),
    width: wp('60%'),
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#e7e7e7',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    countdown: state.countdown,
  };
};

export default connect(mapStateToProps, {signOutUser})(Settings);
