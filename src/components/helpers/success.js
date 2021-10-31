import * as React from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';

const Button = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imgCont}>
        <Image
          source={props.src}
          style={{width: 200, height: '100%', resizeMode: 'contain'}}
        />

      </View>

      <View>
        <Text
          style={{
            fontSize: 30,
            color: '#1D0C47',
            fontWeight: '400',
            marginTop: '10%',
          }}>
          {props.title}
        </Text>
      </View>
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
    height: '70%',
  },
  imgCont: {
    width: '60%',
    height: '50%',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  btn: {
    width: '70%',
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 4,
    backgroundColor: '#1D0C47',
    borderRadius: 10,
    // marginVertical: 10,
    // paddingVertical: 12,
    elevation: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
