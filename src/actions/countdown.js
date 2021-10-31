import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiConfig, client} from '../config/axios';
import store from '../config/configureStore';

export const addUser = (
  token,
  userId,
  email,
  firstName,
  lastName,
  emailVerified,
  phoneVerified,
) => {
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

export const getUserProfile = (userId, owner) => {
  // console.log(userId)
  return dispatch => {
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
  console.log(data);
  await AsyncStorage.setItem(storageKey, data);
};

