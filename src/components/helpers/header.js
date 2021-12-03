import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Logo from './logo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/Ionicons';

const Header = props => {
  return (
    <View style={styles.btnContainer}>
      <View style={styles.logoholder}>
        {!props.backBtn ? (
          <Logo
            imgStyle={{width: 120}}
            containerStyle={{
              width: '40%',
              height: '100%',
              alignItems: 'flex-start',
            }}
          />
        ) : (
          <TouchableOpacity onPress={props.backAction} >
            <FontAwesome
              name={'arrow-back-outline'}
              size={30}
              color={'#1D0C47'}
              style={{marginLeft: 20, fontWeight: '100'}}
            />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.timerBtn}>
        <Text
          style={{
            // fontFamily: 'Raleway-Medium',
            fontSize: 20,
            color: '#1D0C47',
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //  backgroundColor: 'red',
    minHeight: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btnContainer: {
    height: hp('12%'),
    width: '100%',
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // justifyContent: '',
    padding: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  timerBtn: {
    width: '60%',
    height: '80%',
    borderColor: '#FF910099',
    borderWidth: 1,
    maxHeight: 45,
    borderRadius: 7,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoholder: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
  },
});

export default Header;
