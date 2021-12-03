import React from 'react';
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';

import {addUser, signInUser} from '../actions/user';
import Ionicons from 'react-native-vector-icons/Ionicons';
import KeyboardAvoidanceWrapper from './helpers/keyboardAvoidanceWrapper';
import InputField from './helpers/inputField';
import Logo from './helpers/logo';
import Button from './helpers/button';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      textentry: true,
      icon: 'ios-eye',
      emailErr: '',
      passErr: '',
    };
  }

  managePasswordVisibility = () => {
    this.state.textentry
      ? this.setState({icon: 'ios-eye-off'})
      : this.setState({icon: 'ios-eye'});
    this.setState({textentry: !this.state.textentry});
  };

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

  SignInUser = () => {
    Keyboard.dismiss();
    // console.log(this.state);

    const validationResult = this.validateAll();

    if (validationResult.success) {
      this.setState({isSubmitting: true});

      this.props
        .signInUser(this.state)
        .then(result => {
          this.setState({loading: false})
          // console.warn(result);
          switch (result.status) {
            case 200:
              console.log('==============');
              break;
            case 401:
              console.log('login failed');
              break;
            case 402:
              console.log('incorrect username or password');
              break;
            default:
          }
        })
        .catch(err => {
          this.setState({loading: false})
          console.log(err);
          switch (err.status) {
            case "200":
              console.log('==============');
              break;
            case "401":
              console.log('login failed');
              break;
            case "402":
              console.log('incorrect username or password');
              break;
            default:
          }
        });
    }
    // this.props.navigation.navigate('')
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1c" />
        <View style={styles.container}>
          <KeyboardAvoidanceWrapper>
            <View style={styles.logoArea}>
              {/* <Image
                source={require('../assets/logo4x.png')}
                style={{width: 200, resizeMode: 'contain'}}
              /> */}
              <Logo />
            </View>

            <View
              style={{
                width: wp('92%'),
                height: hp('15%'),
                marginLeft: wp('3%'),
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 23, fontWeight: '600', marginRight: '10%'}}>
                Welcome back
              </Text>
              <Text>Log in to continue your earning streak! </Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={{color: 'red', marginBottom: 5}}>
                {' '}
                {this.state.error && this.state.error}{' '}
              </Text>

              <InputField
                label={'Email'}
                returnKeyType="next"
                keyboardType="email-address"
                autoComplete="email"
                placeholder="Email Address"
                value={this.state.email}
                onChangeText={value => this.setState({email: value.trim()})}
                onEndEditing={event => event.nativeEvent.text.trim()}
              />

              <InputField
                label={'Password'}
                returnKeyType="go"
                // ref="password"
                keyboardType="default"
                placeholder="Enter Password"
                value={this.state.password}
                onChangeText={value => this.setState({password: value.trim()})}
                onEndEditing={event => event.nativeEvent.text.trim()}
                secureTextEntry={true}
              />

              {/* <TouchableOpacity style={styles.btn} onPress={this.SignInUser}>
                <Text style={{fontSize: 17, color: 'white'}}>Log In</Text>
              </TouchableOpacity> */}

              <Button
                name={'Log In'}
                action={() => {
                  this.setState({loading: true})
                  this.SignInUser();
                }}
                indicator={this.state.loading}
              />
            </View>
          </KeyboardAvoidanceWrapper>
          <View style={styles.sigupView}>
            <Text>Dont't have an account yet? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{color: '#1E0A9D'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    height: hp('100%'),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '90%',
    alignSelf: 'center',
    marginTop: '3%',
  },
  appBarContainer: {
    backgroundColor: 'transparent',
    height: 49,
    justifyContent: 'center',
  },
  logoArea: {
    height: hp('15%'),
    // backgroundColor: 'chocolate',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    height: hp('31%'),
    width: wp('95%'),
    //   backgroundColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5,
    alignSelf: 'baseline',
  },
  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    marginTop: 13,
  },
  btn: {
    width: wp('70%'),
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    backgroundColor: '#1D0C47',
    borderRadius: 5,
    // marginVertical: 10,
    // paddingVertical: 12,
    elevation: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sigupView: {
    flexDirection: 'row',
    height: hp('10%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    name: 'isaac',
  };
};

export default connect(mapStateToProps, {signInUser})(SignIn);
