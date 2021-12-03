import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const Button = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, props.styles]}
        onPress={props.action}>
        {!props.indicator ? (
          <Text style={[{fontSize: 15, color: 'white'}, props.textStyle]}>{props.name}</Text>
        ) : (
          <ActivityIndicator
            animating
            style={[{margin: 0, padding: 0, height: 50}]}
          />
        )}
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
});

export default Button;
