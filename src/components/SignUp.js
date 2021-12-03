import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser} from '../actions/user';
import Ionicons from 'react-native-vector-icons/Ionicons';

import KeyboardAvoidanceWrapper from './helpers/keyboardAvoidanceWrapper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Logo from './helpers/logo';
import InputField from './helpers/inputField';
import Button from './helpers/button';

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
      loading: false,
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

      this.props
        .signUpUser(this.state)
        .then(result => {
          // console.log(result);
          this.setState({loading: false});
          switch (result.status) {
            case 200:
              this.props.navigation.navigate('SignIn');
              break;
            default:
          }
        })
        .catch(err => {
          // console.log(err);
          this.setState({isSubmitting: false});

          switch (err.status) {
            case 400:
              break;
            default:
          }
        });
    } else {
      this.setState({loading: false});

    }
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={{height: hp('100%')}}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />

          {/* <KeyboardAvoidanceWrapper> */}
          <View style={styles.logoArea}>
            <Logo />
          </View>
          <View
            style={{
              width: wp('100%'),
              // height: hp('7%'),
              flex: 0.1,
              marginLeft: wp('0%'),
              alignItems: 'center',
              // backgroundColor: 'green'
            }}>
            <View style={{width: '91.5%', height: '100%'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  marginRight: '10%',
                  color: '#1D0C47',
                }}>
                Create an account
              </Text>
              <Text
                style={{
                  color: '#1D0C47',
                  fontFamily: 'Raleway-Regular',
                  fontSize: 13,
                }}>
                You are one step away from building a new stream of income.
              </Text>

              {this.state.isSubmitting && (
                <ActivityIndicator
                  animating
                  style={[{margin: 0, padding: 0, height: 50}]}
                />
              )}
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={{color: 'red', marginBottom: 5}}>
              {' '}
              {this.state.error && this.state.error}{' '}
            </Text>

            <InputField
              label={'First Name'}
              returnKeyType="next"
              placeholder="First Name"
              value={this.state.firstName}
              onChangeText={value => this.setState({firstName: value.trim()})}
            />

            <InputField
              label={'Last Name'}
              returnKeyType="next"
              placeholder="Last Name"
              value={this.state.lastName}
              onChangeText={value => this.setState({lastName: value.trim()})}
            />

            <InputField
              label={'Email'}
              returnKeyType="next"
              placeholder="Email Address"
              value={this.state.email}
              onChangeText={value => this.setState({email: value.trim()})}
            />

            <InputField
              label={'Phone'}
              returnKeyType="next"
              placeholder="Phone Number"
              value={this.state.phone}
              onChangeText={value => this.setState({phone: value.trim()})}
            />

            <InputField
              label={'Password'}
              returnKeyType="next"
              placeholder="Enter Password"
              value={this.state.password}
              onChangeText={value => this.setState({password: value.trim()})}
              secureTextEntry={true}
            />

            <InputField
              label={'Re-enter Password'}
              returnKeyType="go"
              returnKeyLabel="Let's go!!"
              placeholder="Re-enter Password"
              value={this.state.confirmPassword}
              onChangeText={value =>
                this.setState({confirmPassword: value.trim()})
              }
              secureTextEntry={true}
            />

            <Button
              name={'Proceed'}
              action={() => {
                this.setState({loading: true});
                this.doSIgnUp();
              }}
              indicator={this.state.loading}
            />
          </View>

          <View style={styles.bottomView}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={{fontFamily: 'Raleway-regular'}}>
                Have an account?
              </Text>
              <Text style={{color: '#1E0A9D', fontFamily: 'Raleway-regular'}}>
                {' '}
                Log In
              </Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontFamily: 'Raleway-regular'}}>
                By clicking “Sign up” you accept Paystrapp’s
              </Text>

              <TouchableOpacity>
                <Text
                  style={{
                    color: '#1E0A9D',
                    flexWrap: 'wrap',
                    flexShrink: 1,
                    fontFamily: 'Raleway-regular',
                  }}>
                  {' '}
                  terms of service
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </KeyboardAvoidanceWrapper> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flex: 1,
    height: hp('90%'),
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
  // appBarContainer: {
  //   backgroundColor: 'transparent',
  //   height: 40,
  //   justifyContent: 'center',
  // },
  bottomView: {
    // flex: 1,
    height: '15%',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  logoArea: {
    flex: 0.25,
    height: hp('19%'),
    // backgroundColor: 'chocolate',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: wp('100%'),
    flex: 1,
    // height: hp('10%'),
    // backgroundColor: 'red',
    height: hp('100%'),
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

  btn: {
    width: '70%',
    height: '9%',
    maxHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    backgroundColor: '#1D0C47',
    borderRadius: 5,
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
