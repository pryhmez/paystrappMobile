import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../config/configureStore';
import {apiConfig, client} from '../config/axios';

export const addUser = (
  token,
  userId,
  email,
  firstName,
  lastName,
  emailVerified,
  phoneVerified,
) => {
  persistUser('USER', {
    token,
    userId,
    email,
    firstName,
    lastName,
    emailVerified,
    phoneVerified,
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
  };
};

export const emailVerified = () => {
  return {type: 'EMAIL_VERIFIED'}
}

export const signInUser = ({email, password}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiConfig.baseUrl + 'auth/signin', {
          email,
          password,
        })
        .then(response => {
          let res = response.data;
          dispatch(
            addUser(
              res.token,
              res.user._id,
              res.user.email,
              res.user.firstName,
              res.user.lastName,
              res.user.emailVerified,
              res.user.phoneVerified,
            ),
          );

          if (response) {
            return resolve(response.data.message);
          }
        })
        .catch(err => {
          // dispatch({ type: SIGNUP_USER_FAILED, payload: true });
          return reject({message: 'something went wrong' + String(err)});
        });
    });
  };
};

export const signUpUser = ({firstName, lastName, email, phone, password}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiConfig.baseUrl + 'auth/signup', {
          email,
          password,
          firstName,
          lastName,
          phone,
        })
        .then(response => {
          let res = response.data.data;
          console.log(res);
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
        client.post('auth/verifyemail', {email}).then(res => {
          console.log(res.data);
        });
      });
    };
  }

  if (code) {
    return dispatch => {
      return new Promise((resolve, reject) => {
        console.log(code, "=========")
        axios.post(apiConfig.baseUrl + 'auth/emailconfirm', {email, code}).then(res => {
          console.log(res.data);

          let status = res.status;
          let success = res.data.success;

          console.log(status)
          // if(status === 200) {

          //     dispatch(emailVerified())
          // }

          if (res) {
            return resolve({status, success});
          }
        }).catch(err => {

        });
      });
    };
  }
};

export const getUserProfile = (userId, owner) => {
  // console.log(userId)
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiConfig.baseUrl + 'user/getmyprofile', {
          userId,
        })
        .then(response => {
          let res = response.data.data;
          // console.log(owner);

          owner &&
            dispatch(
              addUser(
                // res.token,
                'efwevergeagaergraheragabrebae',
                res.user._id,
                res.user.email,
                res.user.firstName + res.user.lastName,
              ),
            );

          // console.warn(response.data.data)
          if (response) {
            return resolve(response.data.data);
          }
        })
        .catch(err => {
          // dispatch({ type: SIGNUP_USER_FAILED, payload: true });
          return reject({message: 'something went wrong' + String(err)});
        });
    });
  };
};

const persistUser = async function (storageKey, payload) {
  const data = JSON.stringify(payload);
  console.log(data)
  await AsyncStorage.setItem(storageKey, data);
};

setInterval( function() {
  store.dispatch({type: 'TICK_TIMER'})
  // console.log('=====!')
}, 1000 )
