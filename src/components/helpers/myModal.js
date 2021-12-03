import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp,
 } from 'react-native-responsive-screen';

const MyModal = props => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.centeredView, props.containerStyle]}>
          <View style={[styles.modalView, props.modalStyle]}>
            {/* <LightButton
              title={'Reset transaction pin'}
              styles={{width: '100%', justifyContent: 'center'}}
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
            /> */}

            {props.children}
          </View>
        </View>
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //  backgroundColor: 'red',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btn: {
    width: '70%',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 4,
    backgroundColor: '#1D0C47',
    borderRadius: 5,
    // marginVertical: 10,
    // paddingVertical: 12,
    elevation: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },


  centeredView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 22,
   marginBottom: 60,
  //  backgroundColor: 'red'
 },
 modalView: {
   height: hp('20%'),
   width: wp('60%'),
   margin: 20,
   backgroundColor: 'white',
   borderRadius: 7,
   padding: 15,
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
   borderWidth: 1,
  //  borderColor: 'blue',
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

export default MyModal;
