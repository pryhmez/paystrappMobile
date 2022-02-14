import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../config/configureStore';
import {socket, connectFunction} from '../config/socketConfig';
import {apiConfig, client} from '../config/axios';

export const addUser = (
  token,
  userId,
  email,
  firstName,
  lastName,
  emailVerified,
  phoneVerified,
  accountBalance,
  transactionPin,
  referralCode
) => {
  persistUser('USER', {
    token,
    userId,
    email,
    firstName,
    lastName,
    emailVerified,
    phoneVerified,
    accountBalance,
    transactionPin,
    referralCode
  });
  return {
    type: 'ADD_USER',
    token,
    userId,
    email,
    firstName,
    lastName,
    emailVerified,
    phoneVerified,
    accountBalance,
    transactionPin,
    referralCode
  };
};

export const emailVerified = () => {
  return {type: 'EMAIL_VERIFIED'};
};

export const signOutUser = () => {
  // AsyncStorage.clear();
  return {
    type: 'SIGN_OUT',
  };
};

export const toggleEye = toggleState => {
  return {type: 'TOGGLE_EYE', toggleState};
};

export const setPin = ({
  token,
  id,
  email,
  firstName,
  lastName,
  emailVerified,
  phoneVerified,
  accountBalance,
  transactionPin,
  referralCode
}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(
        addUser(
          token,
          id,
          email,
          firstName,
          lastName,
          emailVerified,
          phoneVerified,
          accountBalance,
          transactionPin,
          referralCode
        ),
      );

      resolve('done');
    });
  };
};

export const signInUser = ({email, password}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // console.log('about to hit');

      axios
        .post(apiConfig.baseUrl + 'auth/signin', {
          email,
          password,
        })
        .then(response => {
          let res = response.data;
          socket.emit('userid', res.user._id);
          dispatch(
            addUser(
              res.token,
              res.user._id,
              res.user.email,
              res.user.firstName,
              res.user.lastName,
              res.user.emailVerified,
              res.user.phoneVerified,
              res.user.accountBalance,
              res.user.transactionPin,
              res.user.referralCode
            ),
          );

          if (response) {
            return resolve(response.data.message);
          }
        })
        .catch(err => {
          // dispatch({ type: SIGNUP_USER_FAILED, payload: true });
          const response = err.response;
          return reject({
            message: response.data.message
              ? response.data.message
              : 'something went wrong',
            status: String(response.status),
            data: response.data,
          });
        });
    });
  };
};

export const signUpUser = ({firstName, lastName, email, phone, password, referalId}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      console.log('about to hit');
      axios
        .post(apiConfig.baseUrl + 'auth/signup', {
          // .post('https://paystrapp.com/api/auth/signup', {
          email,
          password,
          firstName,
          lastName,
          phone,
          referalId
        })
        .then(response => {
          let res = response.data.data;
          console.log(res, '-------------');
          dispatch(
            addUser(res.token, res._id, res.email, res.firstName, res.lastName),
          );

          // console.warn(response.data.success)
          let status = response.status;
          let success = response.data.success;
          if (response) {
            return resolve({status, success});
          }
        })
        .catch(err => {
          // dispatch({ type: SIGNUP_USER_FAILED, payload: true });
          console.log(err);
          if (err.response) {
            let name = err.response.data.data.name;
            let status = err.response.status;
            // console.log(err.response.data.data.name);
            return reject({message: name, status, error: String(err)});
          } else if (err.Error == 'Network Error') {
          }
        });
    });
  };
};

export const verifyEmail = (email, code) => {
  if (!code) {
    return dispatch => {
      return new Promise((resolve, reject) => {
        axios
          .post(apiConfig.baseUrl + 'auth/verifyemail', {email})
          .then(res => {
            console.log(res.data, 'verifying email');
          });
      });
    };
  }

  if (code) {
    return dispatch => {
      return new Promise((resolve, reject) => {
        // console.log(code, '=========');
        axios
          .post(apiConfig.baseUrl + 'auth/emailconfirm', {email, code})
          .then(res => {
            console.log(res.data);

            let status = res.status;
            let success = res.data.success;

            console.log(status);
            // if(status === 200) {

            //     dispatch(emailVerified())
            // }

            if (res) {
              return resolve({status, success});
            }
          })
          .catch(err => {});
      });
    };
  }
};

export const getUserProfile = (email, token, userId) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // console.log('about to hit');

      axios
        .post(apiConfig.baseUrl + 'auth/getuserprofile', {
          email,
          userId
        })
        .then(response => {
          let res = response.data;
          // socket.emit('userid', res.user._id);
          dispatch(
            addUser(
              res.token,
              res.user._id,
              res.user.email,
              res.user.firstName,
              res.user.lastName,
              res.user.emailVerified,
              res.user.phoneVerified,
              res.user.accountBalance,
              res.user.transactionPin,
              res.user.referralCode
            ),
          );

          if (response) {
            return resolve(response.data.message);
          }
        })
        .catch(err => {
          // dispatch({ type: SIGNUP_USER_FAILED, payload: true });
          const response = err.response;
          return reject({
            message: response.data.message
              ? response.data.message
              : 'something went wrong',
            status: String(response.status),
            data: response.data,
          });
        });
    });
  };
};

const persistUser = async function (storageKey, payload) {
  const data = JSON.stringify(payload);
  console.log(data);
  await AsyncStorage.setItem(storageKey, data);
};

setInterval(function () {
  store.dispatch({type: 'TICK_TIMER'});
  // console.log('=====!')
}, 1000);
