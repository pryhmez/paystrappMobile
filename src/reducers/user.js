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
  accountBalance: 0,
  transactionPin: false,
  toggleEye: false,
  referralCode: ''
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      console.log('adding user', action.referralCode);
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        emailVerified: action.emailVerified,
        phoneVerified: action.phoneVerified,
        accountBalance: action.accountBalance,
        transactionPin: action.transactionPin,
        toggleEye: action.toggleEye,
        referralCode: action.referralCode
      };
      break;
    case 'EMAIL_VERIFIED':
      persistUser('USER', {...state, emailVerified: true});
      return {
        ...state,
        emailVerified: true,
      };
      break;
    case 'TOGGLE_EYE':
      console.log(action.toggleState, '==');
      persistUser('USER', {...state, toggleEye: action.toggleState});
      return {
        ...state,
        toggleEye: action.toggleState,
      };
      break;
    case 'SIGN_OUT':
      AsyncStorage.clear();
      return {
        token: '',
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        emailVerified: null,
        phoneVerified: null,
        accountBalance: 0,
        transactionPin: false,
        toggleEye: false,
        referralCode: ''
      };
      break;
    default:
      return state;
  }
}

const persistUser = async function (storageKey, payload) {
  const data = JSON.stringify(payload);
  await AsyncStorage.setItem(storageKey, data);
};
