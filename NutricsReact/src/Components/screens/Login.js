
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';


import { InputField } from '../commons/InputField';
import { Card } from '../commons/Card';
import { BuyNowButton } from '../commons/BuyNowButton';
import { CircularButton } from '../commons/CircularButton';
import { emailChanged, passwordChanged, loginUser } from '../../Redux/actions/AuthActions';
import { connect } from 'react-redux';
import { Spinner } from '../commons/Spinner';

import { AsyncStorage } from "react-native";

import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';



class Login extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            formValid: true,
            validEmail: false,
            emailAddress: '',
            validPassword: false,
            passwordF: '',
            loading: false,
            loggedIn: false,
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        
    }
    handleEmailChange(email) {
        
        this.props.emailChanged(email);
        console.log(this.props.email);

    }
    


    handlePasswordChange(password) {
        this.props.passwordChanged(password);
        console.log(this.props.password);
    }

    handleButtonClick() {

        const { email, password } = this.props;

        this.props.loginUser({ email, password });

        // this._storeData()
    }

    renderButton() {
       

        if (this.props.loading) {
            return <Spinner size='small' />;
        }
        if (this.props.error !== '') {
            alert(this.props.error)
        } 

        return (<BuyNowButton
            text='Login'
            color={colors.primaryColor}
            onPress={this.handleButtonClick}
        />);
        console.log('run');
    }

    _storeData = async (response) => {
        try {
            // await AsyncStorage.setItem('user_details', JSON.stringify(response));
            await AsyncStorage.setItem('mykey', 'I like to save it.');
            console.log('saving dat Success')
            this.retrieveData()
            // Actions.auth();
        } catch (error) {
            // Error saving data
            console.log('Error saving data' + error)
        }
    }

    retrieveData = async () => {
        // console.log("called retrieve")
        try {
            console.log("try")
            const value = await AsyncStorage.getItem('mykey');
            if (value !== null) {
                // We have data!!
                console.log("value")
                console.log(value);
                
            } else {
                console.log("nulll value")
               
            }
        } catch (error) {
            // Error retrieving data
        }
    }
   
    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.logo}
                    source={require('../../img/nutricslogo.png')} />


                <View style={styles.scrollViewContainer}>

                    <ScrollView>


                        <Text style={styles.loginText}>
                            Login to continue.
                            </Text>

                        <InputField
                            ref="email"
                            labelText='Email'
                            inputType='email'
                            borderBottomColor={colors.lightGray}
                            labelColor={colors.black}
                            onChangeText={this.handleEmailChange}
                            value={this.props.email}
                            onSubmitEditing={
                                (event) => {
                                    console.log("onSubmitEditing");
                                    console.log(this.refs);
                                    console.log(this.refs.height);
                                    this.refs.password.focus();
                                }
                            }

                        />
                        <InputField
                            ref="password"
                            labelText='Password'
                            inputType='password'
                            borderBottomColor={colors.lightGray}
                            labelColor={colors.black}
                            onChangeText={this.handlePasswordChange}
                            value={this.props.password}
                        />

                        <TouchableOpacity style={styles.forgotPassword} onPress={() => Actions.forgotpassword()}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 40 }}>
                            {this.renderButton()}
                        </View>

                        <View style={styles.signupWrapper}>
                            <Text style={styles.newTo}>New to Nutrics? </Text><TouchableOpacity onPress={() => Actions.signup()}><Text style={styles.signupText}>Signup</Text></TouchableOpacity>
                        </View>

                        
                    </ScrollView>
                </View>




            </View>
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

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
}


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser})(Login);