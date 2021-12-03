import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from '../components/helpers/badge';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from '../components/SplashScreen';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import AuthPage from '../components/AuthPage';
import EmailVerification from '../components/EmailVerification';
import ForgotPassword from '../components/ForgotPassword';
import SetTransactionPin from '../components/SetTransactionPin';

import Dashboard from '../components/Dashboard';
import Cards from '../components/Cards';
import Earn from '../components/Earn';
import Paybills from '../components/Paybills';

import AirtimeRecharge from '../components/AirtimeRecharge';
import Settings from '../components/Settings';
import SetWithdrawalAccount from '../components/SetWithdrawalAccount';
import ChangeTransactionPin from '../components/ChangeTransactionPin';

// import Profile from '../components/Profile';

// import ImageIcon from '../components/helpers/ImageIcon';

function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
}

//this helps get the tab we are navigated to and sends to the parent stack
// function getHeaderTitle(route) {
//     const routeName = route.state
//         ? route.state.routes[route.state.index].name
//         : route.params?.screen || 'Home'

//     switch (routeName) {
//         case 'Notifications':
//             return 'Notifications'
//         case 'FindPeople':
//             return 'Search'
//         case 'Connections':
//             return 'Connections'
//         case 'ActiveChats':
//             return 'ActiveChats'
//         case 'Requests':
//             return 'Requests'
//     }
// }

const Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#EE5859',
    background: '#1a1a1c',
    card: '#1a1a1c',
    border: '#1c1c1c',
  },
};

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: '6%',
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                color: isFocused ? '#FF9100' : '#000000',
                fontSize: isFocused ? 17 : 15,
                textAlign: 'center',
                fontWeight: '400',
              }}>
              {label}
            </Text>
            <DottedLine
              length={label.length}
              color={isFocused ? '#FF9100' : '#000000'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const MainStack = createStackNavigator();
const SplashStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createBottomTabNavigator();
const VerifyStack = createStackNavigator();
const PaybillsStack = createStackNavigator();

const AuthScreenNav = () => {
  return (
      <AuthStack.Navigator initialRouteName="AuthPage" headerMode="none">
        <AuthStack.Screen name="AuthPage" component={AuthPage} />
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={({navigation}) => ({})}
        />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <AuthStack.Screen
          name="EmailVerification"
          component={EmailVerification}
        />
        <AuthStack.Screen
          name="SetTransactionPin"
          component={SetTransactionPin}
        />
      </AuthStack.Navigator>
  );
};

const VerifyNav = () => {
  return (
    <VerifyStack.Navigator headerMode="none">
        <VerifyStack.Screen name="EmailVerification" component={EmailVerification} />
        <VerifyStack.Screen name="SetTransPin" component={SetTransactionPin} />
    </VerifyStack.Navigator>
  )
}

const Main = () => {
  return (
    <MainStack.Navigator headerMode='none'>
      <MainStack.Screen name='Tabs' component={TabsNav}/>
      <MainStack.Screen name='AirtimeRecharge' component={PaybillsNav} />
      <MainStack.Screen name='Settings' component={Settings} />
      <MainStack.Screen name='ChangePin' component={ChangeTransactionPin}/>
      <MainStack.Screen name='SetWithdrawalAccount' component={SetWithdrawalAccount} />
      <MainStack.Screen name='Verify' component={VerifyNav}/>
    </MainStack.Navigator>
  )
}

const TabsNav = () => {
  return (
      <HomeStack.Navigator
        tabBar={props => <MyTabBar {...props} />}
        initialRouteName="Dashboard">
        {/* <HomeStack.Screen name='Home' component={Home} /> */}
        <HomeStack.Screen name="Dashboard" component={Dashboard} />
        <HomeStack.Screen name="Earn" component={Earn} />
        <HomeStack.Screen name="Paybills" component={Paybills} />
        <HomeStack.Screen name="More" component={Cards} />
      </HomeStack.Navigator>
  );
};

const SplashNav = () => {
  return (
      <SplashStack.Navigator initialRouteName="AuthPage" headerMode="none">
        <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      </SplashStack.Navigator>
  );
};

const PaybillsNav = () => {
  return (
    <PaybillsStack.Navigator headerMode="none">
      <PaybillsStack.Screen name="airtime" component={AirtimeRecharge} />
      <PaybillsStack.Screen name="paybills" component={Paybills} />
    </PaybillsStack.Navigator>
  )
}

// const Settings = () => {
//   return ()
// }

const DottedLine = ({color, length}) => (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={[styles.text, {color}]}>
        {Array.from({length: length == 8 ? 11 : length * 2}).map(() => '. ')}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    //   justifyContent: 'center',
    height: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  subContainer: {
    width: '80%',
    height: 10,
    alignContent: 'center',
    //   backgroundColor: 'orange'
  },
  text: {top: -15, fontSize: 10, fontWeight: '900', textAlign: 'center'},
});

export {
  Main,
  SplashNav, 
  AuthScreenNav, 
  TabsNav,
  VerifyNav
};
