import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Picker,
  Keyboard,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser} from '../../actions/user';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: '',
      icon: 'ios-eye',
      textentry: true,
      next: true,
    };
  }

  managePasswordVisibility = () => {
    this.state.textentry
      ? this.setState({icon: 'ios-eye-off'})
      : this.setState({icon: 'ios-eye'});
    this.setState({textentry: !this.state.textentry});
  };

  SignUpUser = () => {
    Keyboard.dismiss;
    // let {firstName, lastName, gender, email, password} = this.state;
    // console.log(firstName, email, phone)
    // this.props.signUpUser(
    //   firstName,
    //   lastName,
    //   gender,
    //   '44',
    //   email,
    //   this.props.phone,
    //   password,
    // );
  };

  render() {
    return (
      <View style={{...styles.mainContainer, alignItems: 'center'}}>
        

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'yellow',
    width: '85%',
    // alignItems: 'center',
    marginTop: '1%',
  },
  inputBox: {
    width: '100%',
    height: '8%',
    fontSize: 16,
    borderWidth: 1.1,
    borderColor: 'rgba(255, 145, 0, 0.8)',
    borderRadius: 10,
    color: '#403F45',
    marginBottom: 7,
    marginTop: 7,
    padding: 10,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    height: '8%',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: '10%',
    backgroundColor: '#1D0C47',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 12,
    elevation: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
    marginBottom: '6%',
  },
  appBarContainer: {
    backgroundColor: 'transparent',
    height: 49,
    justifyContent: 'center',
  },
  backBtn: {
    marginLeft: 14,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5,
  },
  SignUpText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 15,
  },
  text: {
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    name: 'isaac',
  };
};

export default connect(mapStateToProps, {signUpUser})(SignUpForm);
