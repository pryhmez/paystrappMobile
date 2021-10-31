import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import SearchBar from "react-native-dynamic-search-bar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from './helpers/SearchItem';
import axios from 'axios';
import { apiConfig } from '../config/axios';



class FindPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            arr: []
        }
    }
    
    filterList(list) {
        return list.filter(
            (listItem) =>
            listItem.artist
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
            listItem.song.toLowerCase().includes(this.state.search.toLowerCase()),
            );
        }
        
        queryDb(query) {
            // console.log(apiConfig.baseUrl);
            axios.post(apiConfig.baseUrl + 'user/finduser',
            {
                search: query
            })
            .then((response) => {
                let res = response.data;
                // console.warn(res);
                console.log(res.data)
                this.setState(() => ({ arr: res.data }))
                return res.data
                
            })
            
        }
        
        onClickOption(id) {
        console.log(id + 'dhfkfhvkj')
     }


    render() {
        // const list = [
        //     { artist: 'The Weeknd', song: 'Blinding Lights' },
        //     { artist: 'Drake', song: 'Toosie Slide' },
        //     { artist: 'Roddy Ricch', song: 'The Box' },
        //     { artist: 'Dua Lipa', song: 'Dont Start Now' },
        // ];

        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#1a1a1c' }]}>

                <StatusBar barStyle="light-content" backgroundColor="#1a1a1c" />
                <View style={styles.container}>
                    {/* this was just a temporary action bar made static */}

                    {/* <View style={styles.appBarContainer}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={'ios-arrow-round-back'} size={27} color={'white'} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.headerText} >Search</Text>
                        </View>
                    </View> */}

                    <View style={styles.SectionStyle}>

                        <TouchableOpacity onPress={() => { this.queryDb(this.state.search) }}>

                            <Ionicons name={'ios-search'} size={27} color={'#5F5E62'} style={styles.ImageStyle} />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.TextInputStyleClass}
                            placeholder="Enter Search"
                            placeholderTextColor="#5F5E62"
                            underlineColorAndroid="transparent"
                            onChangeText={(search) => {
                                this.queryDb(search.toLowerCase())
                                return this.setState({ search })
                            }}
                        />
                    </View>
                    {/* {console.log(this.queryDb(this.state.search))} */}
                    {/* {this.queryDb(this.state.search)} */}
                    {this.state.arr.map((listItem, index) => (

                        <Item
                            key={index}
                            name={listItem.firstName + ' ' + listItem.lastName}
                            pic={listItem.email}
                            id={listItem._id}
                            clickedOption={this.onClickOption} />
                    ))}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a1c',
        flex: 1,
        margin: 5
    },
    appBarContainer: {
        backgroundColor: 'transparent',
        height: 49,
        flexDirection: "row"
    },
    headerText: {
        alignSelf: "center",
        fontSize: 20,
        color: "white"
    },
    backBtn: {
        marginLeft: 14,
    },
    text: {
        color: 'white'
    },
    TextInputStyleClass: {
        flex: 1,
        borderColor: '#363636',
        borderRadius: 5,
        backgroundColor: "#363636",
        color: '#fff'

    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#363636',
        backgroundColor: "#363636",
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        // margin: 10,
    },
    ImageStyle: {
        marginLeft: 9,
        marginRight: 5
        // padding: 10,
        // margin: 5,
        // height: 25,
        // width: 25,
        // resizeMode: 'stretch',
        // alignItems: 'center',
    },
})

export default FindPeople;