import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, View, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import FloatingLabelTextInput from '../helpers/FloatingLabelTextInput';
// import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 5;

const PhoneVerification = (prop) => {
    const [value, setValue] = useState('');
    const [phone, setPhone] = useState('');
    const [sent, setSent] = useState('');
     // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const verify = () => {
        console.warn(phone)
        setSent(true)
    }

      // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
      if (phoneNumber.charAt(0) == '0') {
          await setPhone('+234'+phoneNumber.substring(1))
      }
      Keyboard.dismiss
    //   let p = '+234'+phoneNumber.substring(1);
    const confirmation = await auth().signInWithPhoneNumber('+447444555666');
    setConfirm(confirmation);
    setSent(true);
  }

  async function confirmCode() {
    try {
        //i replaced code with value
      await confirm.confirm(value);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#1a1a1c' }]}>

            <StatusBar barStyle="light-content" backgroundColor="#1a1a1c" />
            {/* <View style={styles.container}>
                <View style={styles.appBarContainer}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-round-back'} size={27} color={'white'} />
                    </TouchableOpacity>
                </View> */}

            <View style={styles.mainContainer}>
                {
                // sent 
                confirm
                    ?
                    (
                        <>
                            <View style={{ marginBottom: 10, height: '20%' }}>
                                <Text style={styles.headerTxt}>Verification</Text>
                                <Text style={{ ...styles.title }}>A verification message has been sent to</Text>
                                <Text style={{ ...styles.title, color: 'white' }}>{phone}</Text>
                            </View>
                            <CodeField
                                ref={ref}
                                {...props}
                                value={value}
                                onChangeText={setValue}
                                cellCount={prop.cellcount}
                                rootStyle={styles.codeFiledRoot}
                                keyboardType="number-pad"
                                renderCell={({ index, symbol, isFocused }) => {
                                    if (value.length == prop.cellcount) {
                                        
                                        () => confirmCode()
                                        prop.sendPhone(phone)
                                        return
                                    }
                                    // console.warn(value.length, prop.cellcount)
                                    return (

                                        <Text
                                            key={index}
                                            style={[styles.cell, value.length >= index + 1 && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )
                                }
                                }
                            />
                            <TouchableOpacity style={{marginTop: 40, justifyContent: 'center', width: '100%', flexDirection: 'row'}} onPress={() => signInWithPhoneNumber(phone)}>
                                <Text style={{color: 'white'}}>Resend</Text>
                            </TouchableOpacity>
                        </>
                    )
                    :
                    (
                        <>
                            <View style={{ marginBottom: 20, height: '20%' }}>
                                <Text style={styles.headerTxt}>Verification</Text>
                                <Text style={{ ...styles.title }}>Please input your phone number to recieve a verification code</Text>
                                {/* <Text style={{...styles.title, color: 'white'}}>{phone}</Text> */}
                            </View>
                            {/* <TextInput style={{ ...styles.inputBox }}
                                autoFocus
                                onChangeText={(phone) => setPhone(phone)}
                                underlineColorAndroid='#A49B95'
                                placeholder="Input Phone"
                                secureTextEntry={false}
                                keyboardType={"number-pad"}
                                placeholderTextColor="#403F45"
                                autoCapitalize='false'
                                // ref={(input) => this.state.phone = input}
                                value={phone}
                            /> */}
                            <FloatingLabelTextInput
                                label="Input Phone"
                                value={phone}
                                keyboardType={'number-pad'}
                                // underlineColorAndroid='#A49B95'
                                onChangeText={(phone) => setPhone(phone)}
                            />
                            <TouchableOpacity style={styles.btn} onPress={() => signInWithPhoneNumber(phone)}>
                                <Text style={styles.SignUpText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
            </View>

            {/* </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a1c',
        flex: 1
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        width: '90%',
        alignSelf: 'center',
        marginTop: '3%'
    },
    headerTxt: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'white',
        marginBottom: '6%'
    },
    appBarContainer: {
        backgroundColor: 'transparent',
        height: 49,
        justifyContent: 'center',
    },
    backBtn: {
        marginLeft: 14
    },
    root: { flex: 1, padding: 20 },
    title: { fontSize: 15, color: '#A49B95' },
    codeFiledRoot: { marginTop: 20, width: '100%' },
    cell: {
        width: 50,
        height: 60,
        lineHeight: 70,
        color: '#1a1a1c',
        fontSize: 30,
        borderWidth: 2,
        borderColor: '#A49B95',
        textAlign: 'center',
        borderRadius: 50,
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5
    },
    focusCell: {
        borderColor: '#19191B',
        backgroundColor: 'white'
    },
    inputBox: {
        width: '100%',
        fontSize: 16,
        color: '#403F45'
    },
    btn: {
        width: '100%',
        height: 40,
        marginTop: '10%',
        backgroundColor: '#EE5859',
        borderRadius: 30,
        marginVertical: 10,
        paddingVertical: 12,
        elevation: 200,
        justifyContent: 'center'
    },
    SignUpText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: '900',
        fontSize: 15
    },
});

export default PhoneVerification;



// function PhoneSignIn() {

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }