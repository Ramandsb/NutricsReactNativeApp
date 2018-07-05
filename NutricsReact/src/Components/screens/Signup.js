
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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

import { InputField } from '../commons/InputField';
import { Card } from '../commons/Card';
import { BuyNowButton } from '../commons/BuyNowButton';
import { Spinner } from '../commons/Spinner';
import NextArrowButton from '../commons/NextArrowButton';

import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';

import { signUpUser, signUp } from '../../Redux/actions/SignupActions';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailValid: true,
            passwordsMatch: true,
            passwordValid: true
        };
        this.handleSignupButton = this.handleSignupButton.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.validateEmail = this.validateEmail.bind(this);

        
    }

    handleSignupButton(){
        // Actions.goals()

        const { email, password, phone, firstname, lastname} = this.props;

       

        this.props.signUp({ email, password, phone, firstname, lastname });
       

       
        
    }

    renderButton() {
        // const { formValid } = this.state;
        // var mainColor = colors.green01;

        if (this.props.loading) {
            return <Spinner size='small' />;
        }
        if (this.props.error !== '') {
            // mainColor = colors.darkOrange;
            alert(this.props.error)
        } else {
            // mainColor = colors.green01;
            // alert('No Error')
        }

        return (<BuyNowButton
            text='Submit'
            color={colors.primaryColor}
            onPress={() => this.handleSignupButton()}
        />);
        console.log('run');
    }
    renderError() {
        if (this.props.error) {
            console.log(this.props.error);
        }
    }

    validateEmail(email){
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.state.emailValid) {
            if (emailCheckRegex.test(email)) {
                this.setState({ emailValid: true });
                // alert(this.state.emailValid);
            }
        } else if (!emailCheckRegex.test(email)) {
            this.setState({ emailValid: false });
            // alert(this.state.emailValid);
        }

        // if (emailCheckRegex.test(email)){
        //     this.setState({ emailValid: true });
        //     alert(this.state.emailValid);
        // }else{
        //     this.setState({ emailValid: false });
        //     alert(this.state.emailValid);
        // }
    }


    render() {
        console.log(this.state.emailValid)
       
        return (
            <KeyboardAvoidingView style={styles.container}>

                <Image
                    style={styles.logo}
                    source={require('../../img/nutricslogo.png')} />


                <View style={styles.scrollViewContainer}>

                    <ScrollView>


                        <Text style={styles.loginText}>
                            Sign up to continue.
                        </Text>
                        <InputField
                            labelText='First name'
                            inputType='email'
                            borderBottomColor={colors.lightGray}
                            labelColor={colors.black}
                            onChangeText={value => this.props.
                                signUpUser({ prop: 'firstname', value: value })}
                            value={this.props.firstname}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { console.log("next") }}
                        />
                        <InputField
                            labelText='Last name'
                            inputType='email'
                            borderBottomColor={colors.lightGray}
                            labelColor={colors.black}
                            onChangeText={value => this.props.
                                signUpUser({ prop: 'lastname', value: value })}
                            value={this.props.lastname}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { console.log("next") }}
                        />
                        <InputField
                            labelText='Email'
                            inputType='email'
                            borderBottomColor={colors.lightGray}
                            labelColor={colors.black}
                            onChangeText={value => this.props.
                                signUpUser({ prop: 'email', value: value })}
                            value={this.props.email}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { console.log("next") }}
                        />
                        
                        <InputField
                            labelText='Password'
                            inputType='password'
                            borderBottomColor={colors.lightGray}
                            labelColor={colors.black}
                            onChangeText={value => this.props.
                                signUpUser({ prop: 'password', value: value })}
                            value={this.props.password}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { console.log("next") }}
                        />
                        
                            <View style={styles.buttonWrapper}>
                            {this.renderButton()}
                            </View>
                    </ScrollView>
                </View>




            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 200,
        height: 50,
        marginTop: 70,
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        padding: 20
    },
    buttonWrapper: {
        height: 40,
        width: '80%',
        marginTop: 40,
        alignSelf: 'center'

    },
    loginText: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 30,
        color: colors.darkGray
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,

    },
    forgotPasswordText: {
        color: colors.primaryColor
    },
    signupWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 25
    },
    newTo: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.darkGray
    },
    signupText: {
        color: colors.primaryColor
    }


});


const mapStateToProps = (state) => {
    const { email, password, confirmPassword, firstname, lastname, response, error, loading} = state.signup;
    return { email, password, confirmPassword, firstname, lastname, response, error, loading};
};

export default connect(mapStateToProps, { signUpUser, signUp })(Signup);