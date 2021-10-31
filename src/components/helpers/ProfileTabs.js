import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import video from '../helpers/contentVideoTiles';
import picture from '../helpers/contentPictureTiles';


// const gallerySwitch = createMaterialTopTabNavigator();

const gallerySwitch = createBottomTabNavigator();



const SwitchNav = () => {
    return (
        <gallerySwitch.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let s = 21;

                    if (route.name === 'Pictures') {
                        iconName = 'ios-images'
                        s = focused
                            ? 25
                            : 21;
                     

                    } else if (route.name === 'Videos') {
                        iconName = 'ios-videocam'
                        s = focused
                            ? 25
                            : 21;
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={s} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#EE5859',
                inactiveTintColor: 'gray',
                showLabel: true
            }}>
            {/* <HomeStack.Screen name='Home' component={Home} /> */}
            <gallerySwitch.Screen name='Pictures' component={picture} />
            <gallerySwitch.Screen name='Videos' component={video} />
            
        </gallerySwitch.Navigator>
    )
}

export {SwitchNav}