
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import { InputField } from '../commons/InputField';
import { Card } from '../commons/Card';
import { BuyNowButton } from '../commons/BuyNowButton';
import NextArrowButton from '../commons/NextArrowButton';

import colors from '../../styles/colors/index';



class ForgotPassword extends Component {


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.forgotPassword}>
                    Forgot Password?
                        </Text>
                <Text style={styles.subText}>
                    Retrieve Your Password
                </Text>
                <View style={styles.input}>
                <InputField
                    labelText='Email'
                    inputType='email'
                    borderBottomColor={colors.lightGray}
                    labelColor={colors.black}

                />
                </View>

                <View style={styles.buttonWrapper}>
                    <BuyNowButton
                        text='Submit'
                        color={colors.primaryColor}
                    />
                </View>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingTop: 150
    },
    forgotPassword: {
        fontSize: 25,
    },
    subText:{
        fontSize: 14,
        color: colors.darkGray,
        marginBottom: 30,
    },
    input:{
        width: '90%',
        marginTop: 20
    },
    buttonWrapper:{
        height: 40, 
        width: '80%', 
        marginTop: 40 
    }


});



export default ForgotPassword;