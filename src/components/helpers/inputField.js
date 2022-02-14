import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {TextInput, HelperText, theme} from 'react-native-paper';

const Inputfield = props => {
  const [isfocused, setIsfocused] = useState(false);



  return (
    <View style={[styles.container, props.container]}>
      <TextInput
        {...props}
        mode={'outlined'}
        label={isfocused && props.label}
        onFocus={focus => setIsfocused(true)}
        onBlur={focus => setIsfocused(false)}
        style={[props.styles, styles.input]}
        outlineColor={'#FF9100cc'}
        activeOutlineColor={'#FF9100D9'}
        activeUnderlineColor={'transparent'}
        theme={{
          fonts: {
            regular: {fontFamily: 'Raleway-Regular'}
          },
        }}
      />
      <HelperText type="error" visible={props.error} >
        {props.error}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //  minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
    paddingHorizontal: 15,
  },
  input: {
    height: 45,
    color: 'black',
    width: '100%',
    //  flex: 1,
    backgroundColor: 'white',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
});

export default Inputfield;
