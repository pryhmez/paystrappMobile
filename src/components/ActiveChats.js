import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const ActiveChats = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello from activechats</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#1a1a1c',
        flex: 1
    },
    text: {
        color: 'blue'
    }
})

export default ActiveChats;