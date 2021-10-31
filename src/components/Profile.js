import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getUserProfile, sendFriendRequest } from '../actions/user'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SwitchNav } from './helpers/ProfileTabs';
// const wide = wp();


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            userName: '',
            friends: '',
            crushes: '',
            dates: '',
            profilePix: '',
            owner: ''
        }

    }

    componentDidMount() {
        let id = this.props.route.params ? this.props.route.params.id : this.props.userId;
        this.props.route.params ? this.setState(() => ({owner: false})) : this.setState(() => ({owner: true}))
        
        this.props.getUserProfile(id, this.state.owner).then(res => {
            
            this.setState(() => ({
                name: res.user.firstName + " " + res.user.lastName,
                userName: res.user.firstName,
                friends: res.friends[0] ? res.friends[0].total : '0',
                crushes: res.crushes[0] ? res.crushes[0].total : '0'
            }))
            console.log(this.state);
        })

    };

    addFriend(sender, reciever) {
        this.props.sendFriendRequest(sender, reciever).then(res => {
            console.log(res);
        })
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.TopViewContainer}>
                    <View style={{ marginTop: 25, marginBottom: 25, flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                        <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                            <Image
                                source={{ uri: 'data:image/jpeg;base64,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' }}
                                style={{ width: hp('30%') / 2.3, height: hp('30%') / 2.3, borderRadius: hp('30%') / 4, padding: 10, backgroundColor: 'transparent' }} />
                        </View>
                        <View style={{ backgroundColor: 'tranparent', flex: 2.5, justifyContent: 'space-around' }}>
                            <View style={{ height: '80%', marginBottom: 10, marginTop: 10, backgroundColor: 'transparent' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#fff', fontSize: 24, marginTop: 0, fontWeight: '100' }}>{this.state.name}</Text>
                                    <Text style={{ color: '#363636', fontSize: 13, textAlignVertical: 'top', padding: 0 }}>{'@' + this.state.userName}</Text>
                                    {/* {console.log(this.props.userId)} */}
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 50 }}>

                                    <TouchableOpacity style={{ ...styles.Stats }}>
                                        <Text style={{ color: '#fff', fontSize: 20, marginTop: 0, fontWeight: '100', alignSelf: 'center' }}>{this.state.friends}</Text>
                                        <Text style={{ color: '#363636', fontSize: 13, marginTop: 0 }}>friends</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.Stats}>
                                        <Text style={{ color: '#fff', fontSize: 20, marginTop: 0, fontWeight: '100', alignSelf: 'center' }}>{this.state.crushes}</Text>
                                        <Text style={{ color: '#363636', fontSize: 13, marginTop: 0 }}>Crushes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.Stats}>
                                        <Text style={{ color: '#fff', fontSize: 20, marginTop: 0, fontWeight: '100', alignSelf: 'center' }}>130K</Text>
                                        <Text style={{ color: '#363636', fontSize: 13, marginTop: 0 }}>dates</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={styles.BottomViewContainer}>
                    {
                        this.props.route.params
                        &&
                        (
                            <View style={styles.requestBtn}>
                                <TouchableOpacity style={styles.requestTouchable} onPress={() => {this.addFriend(this.props.userId, this.props.route.params.id)}}>
                                    <Text style={{ color: '#fff', fontSize: 20, marginTop: 0, fontWeight: '500', alignSelf: 'center' }}>SEND REQUEST</Text>
                                </TouchableOpacity>

                            </View>
                        )
                    }
                    <SwitchNav />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    TopViewContainer: {
        backgroundColor: 'transparent',
        flex: hp('30%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    BottomViewContainer: {
        backgroundColor: 'transparent',
        flex: hp('70%')
    },
    Stats: {
        backgroundColor: 'transparent',
        // flex: 1,
        padding: 0,
        margin: 0
    },
    requestBtn: {
        backgroundColor: 'transparent',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    requestTouchable: {
        backgroundColor: 'transparent',
        width: wp('50%'),
        borderRadius: 3,
        elevation: 10,
        borderBottomColor: 'blue'
    }
})


const mapStateToProps = (state) => {
    return ({
        userId: state.user.userId
    })
}

export default connect(mapStateToProps, { getUserProfile, sendFriendRequest })(Profile);