import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: '',
  userId: '',
  // userId: '5e7a5fe9e8763909af2975a4',
  email: '',
  firstName: '',
  lastName: '',
  emailVerified: null,
  phoneVerified: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        emailVerified: action.emailVerified,
        phoneVerified: action.phoneVerified
      };
      break;
    case 'EMAIL_VERIFIED':
        persistUser('USER', {...state, emailVerified: true})
      return {
        ...state,
        emailVerified: true,
      };
    default:
      return state;
  }
}

const persistUser = async function (storageKey, payload) {
    const data = JSON.stringify(payload);
    await AsyncStorage.setItem(storageKey, data);
  };