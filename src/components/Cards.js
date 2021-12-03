import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import ComingSoon from './helpers/success';
import Emoji from '../assets/Emoji.png';


const Cards = (props) => {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content"/>

            <ComingSoon title={"Coming Soon"} src={Emoji}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    }
})

export default Cards;