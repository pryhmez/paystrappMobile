import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';



const SplashScreen = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1C',
        flex: 1
    },
    text: {
        color: 'blue'
    }
})

export default SplashScreen;