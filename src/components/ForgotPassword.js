import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const ForgotPassword = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello from activechats</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'rgb(26, 26, 28)',
        flex: 1
    },
    text: {
        color: 'blue'
    }
})

export default ForgotPassword;