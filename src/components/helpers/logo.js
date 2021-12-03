import * as React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Logo = props => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Image
        source={require('../../assets/logo4x.png')}
        style={[{width: 160, resizeMode: 'contain'}, props.imgStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //   backgroundColor: 'red',
    //   minHeight: 40,
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
});

export default Logo;
