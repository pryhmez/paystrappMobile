import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser} from '../actions/user';
import {Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import KeyboardAvoidanceWrapper from './helpers/keyboardAvoidanceWrapper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class SignUp extends React.Component {
  // const CELL_COUNT = 5;
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
  }

  validations = {
    email: {
      validate(state) {
        if (!state.email) {
          return 'Email address is required.';
        }

        if (
          !/^\w+([\.\-\+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(state.email)
        ) {
          return 'Invalid email address.';
        }

        return null;
      },
      input: 'email',
    },
    password: {
      validate(state) {
        if (!state.password) {
          return 'Password is required.';
        }

        if (state.password.length < 6) {
          return 'Password is too short (minimum is 6 characters).';
        }

        return null;
      },
      input: 'password',
    },
    confirmPassword: {
      validate(state) {
        return state.password === state.confirmPassword
          ? null
          : 'Password confirmation not matched.';
      },
      input: 'confirmPassword',
    },
    firstName: {
      validate(state) {
        return state.firstName ? null : 'firstName is required.';
      },
      input: 'firstName',
    },
    lastName: {
      validate(state) {
        return state.lastName ? null : 'lastName is required.';
      },
      input: 'lastName',
    },
    phone: {
      validate(state) {
        if (!state.phone) {
          return null; // phone number is optional
        }

        // got the regex from https://stackoverflow.com/a/20971688
        if (
          !/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(
            state.phone,
          )
        ) {
          return 'Invalid phone number.';
        }

        return null;
      },
      input: 'phone',
    },
  };

  getInvalidPropertyMessage(property, state) {
    // Logger.log(state, 'validate state')
    return this.validations[property].validate(state || this.state);
  }

  validateAll() {
    for (const property in this.validations) {
      const invalidMessage = this.getInvalidPropertyMessage(property);
      if (invalidMessage) {
        this.setState({error: invalidMessage});
        this.refs[this.validations[property].input].focus();
        return {message: invalidMessage};
      }
    }
    return {success: true};
  }

  doSIgnUp = async () => {
    Keyboard.dismiss();
    const validationResult = this.validateAll();

    if (validationResult.success) {
      this.setState({isSubmitting: true});
      console.log(validationResult);

      this.props.signUpUser(this.state).then(
        result => {
          // console.log(result);
          this.setState({isSubmitting: false});
          switch(result.status) {

            case 200:
              this.props.navigation.navigate('SignIn')
              break;
              default:
          }
        }
        ).catch(err => {
        // console.log(err);
        this.setState({isSubmitting: false});

        switch(err.status) {
          case 400:
          break;
          default:

        }
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1D0C47" />
        {/* 
          <View style={styles.appBarContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name={'ios-arrow-round-back'}r
                size={27}
                color={'white'}
              /> 
            </TouchableOpacity>
          </View> */}

        <KeyboardAvoidanceWrapper>
          <View style={styles.logoArea}>
            <Image
              source={require('../assets/logo4x.png')}
              style={{width: 200, resizeMode: 'contain'}}
            />
          </View>

          <View
            style={{width: wp('92%'), height: hp('7%'), marginLeft: wp('3%')}}>
            <Text style={{fontSize: 23, fontWeight: '600', marginRight: '10%'}}>
              Create an account
            </Text>
            <Text>
              You are one step away from building a new stream of income.
            </Text>

            {this.state.isSubmitting && (
              <ActivityIndicator
                animating
                style={[{margin: 0, padding: 0, height: 50}]}
              />
            )}
          </View>

          <View style={styles.formContainer}>
            <Text style={{color: 'red', marginBottom: 5}}>
              {' '}
              {this.state.error && this.state.error}{' '}
            </Text>

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="default"
              ref="firstName"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="First Name"
              placeholderTextColor="#1D0C47"
              value={this.state.firstName}
              onChangeText={value => this.setState({firstName: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="default"
              ref="lastName"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Last Name"
              placeholderTextColor="#1D0C47"
              value={this.state.lastName}
              onChangeText={value => this.setState({lastName: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="email-address"
              ref="email"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Email Address"
              placeholderTextColor="#1D0C47"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
              errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="phone-pad"
              ref="phone"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Phone Number"
              placeholderTextColor="#1D0C47"
              value={this.state.phone}
              onChangeText={value => this.setState({phone: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="password"
              secureTextEntry={true}
              ref="password"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Password"
              placeholderTextColor="#1D0C47"
              value={this.state.password}
              onChangeText={value => this.setState({password: value})}
              errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="default"
              secureTextEntry={true}
              ref="confirmPassword"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Re-enter Password"
              placeholderTextColor="#1D0C47"
              value={this.state.confirmPassword}
              onChangeText={value => this.setState({confirmPassword: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <TouchableOpacity style={styles.btn} onPress={this.doSIgnUp}>
              <Text style={{color: 'white'}}>Proceed</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomView}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text>Have an account?</Text>
              <Text style={{color: '#1E0A9D'}}> Log In</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text>By clicking “Sign up” you accept Paystrapp’s</Text>

              <TouchableOpacity>
                <Text
                  style={{color: '#1E0A9D', flexWrap: 'wrap', flexShrink: 1}}>
                  {' '}
                  terms of service
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidanceWrapper>
        {/* <PhoneVerification cellcount={6} sendPhone={this.setPhone} /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  appBarContainer: {
    backgroundColor: 'transparent',
    height: 40,
    justifyContent: 'center',
  },
  bottomView: {
    flex: 1.5,
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  logoArea: {
    // flex: 2,
    height: '15%',
    // backgroundColor: 'chocolate',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: wp('100%'),
    // backgroundColor: 'red',
    // height: hp('65%'),
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 0,
    alignItems: 'center',
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
    marginBottom: '6%',
  },
  backBtn: {
    marginLeft: 14,
  },
  input: {
    width: '100%',
    flex: 1,
    height: hp('7%'),
    backgroundColor: 'white',
    borderWidth: 1.2,
    borderColor: '#FF9100',
    padding: '2.4%',
    borderRadius: 7,
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 0,
    // backgroundColor: 'brown'
  },
  inputContainer: {
    borderColor: 'transparent',
    // height: 'q%',
    alignItems: 'center',
    // padding: 10,
    // backgroundColor: 'green',
    marginBottom: 0,
    marginTop: 0,
  },
  btn: {
    width: '70%',
    height: '9%',
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

const mapStateToProps = state => {
  return {
    name: 'isaac',
  };
};

export default connect(mapStateToProps, {signUpUser})(SignUp);
