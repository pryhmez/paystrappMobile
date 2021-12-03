import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp,
 } from 'react-native-responsive-screen';

const LightButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, props.styles]}
        onPress={props.action}>
        {props.children || (<Text style={{textAlign: 'center'}}>{props.title}</Text>)}
      </TouchableOpacity>
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
    width: '100%',
    height: hp('6.2%'),
    minHeight: 45,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 4,
    borderColor: '#FF9100',
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
   //  elevation: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LightButton;
