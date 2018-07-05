
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import * as Animatable from 'react-native-animatable';

import { InputField } from '../commons/InputField';
import { Card } from '../commons/Card';
import { BuyNowButton } from '../commons/BuyNowButton';
import { CircularButton } from '../commons/CircularButton';
import { GoalRoundButton } from '../commons/GoalRoundButton';

import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';

import { signUpUser } from '../../Redux/actions/SignupActions';
import { AsyncStorage } from "react-native";

class Goals extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleButtonClick = this.handleButtonClick.bind(this)
       
    }
    componentDidMount() {
        this.refs.one.fadeInUp(500);
        this.refs.two.fadeInUp(700);
        this.refs.three.fadeInUp(900);
        this.refs.header.zoomIn(900);
        
        // this.parseUserDataFromJson();
    }
    // parseUserDataFromJson() {
    //     let data = {
    //         "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTNkYWJjOTA3YTU5ZWQyYWVmN2JmNTciLCJmaXJzdE5hbWUiOiJBbXJpdHBhbCIsImxhc3ROYW1lIjoiTW9vbWllIiwiZW1haWwiOiJhbXJpdHBhbDc1MEBnbWFpbC5jb20iLCJyb2xlIjoiTWVtYmVyIiwiaWF0IjoxNTMwMTM4NjQ4LCJleHAiOjE1MzA3NDM0NDh9.pNYwXGoQKZGsOayB6hi8oJ-4Yx3zfb4HnhhvThlHD-o",
    //         "user": {
    //             "_id": "593dabc907a59ed2aef7bf57",
    //             "firstName": "Amritpal",
    //             "lastName": "Moomie",
    //             "email": "amritpal750@gmail.com",
    //             "role": "Member"
    //         }
    //     }
    //     let jsonData = JSON.stringify(data);
    //     let parsed = JSON.parse(jsonData);
    //     console.log(parsed.user._id)
    //     console.log(parsed.token)



    // }
    
    handleButtonClick(value){
            console.log("handle")
            this.props.
                signUpUser({ prop: 'goal', value: value });
        let data = {
            "goal": value,
        }
       
            this._storeData(data);
        
            
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('profile_details', JSON.stringify(data));
            console.log('saving dat Success')
            Actions.proAccount()
        } catch (error) {
            // Error saving data
            console.log('Error saving data'+error)
        }
    }

    render() {
        
        return (
            <View style={styles.container}>

                <Animatable.View ref="header" style={{marginBottom: 100}}>
                    <Text style={styles.headingText}>Whats your goal?</Text>
                </Animatable.View>

                <Animatable.View ref="one"style={{flexDirection: 'row'}}>
                    <GoalRoundButton onPress={() => this.handleButtonClick('maintain')}>
                        <Text style={styles.textStyle} >Be Healthier</Text>
                        <Text style={styles.subHeadingText}>Eat and train Optimum health</Text>
                    </GoalRoundButton>
                </Animatable.View>
                <Animatable.View ref="two" style={{ flexDirection: 'row', marginTop: 20}}> 
                    <GoalRoundButton onPress={() => this.handleButtonClick('lose-weight' )}>
                        <Text style={styles.textStyle}>Loose Weight</Text>
                        <Text style={styles.subHeadingText}>Get leaner and increase you stamina</Text>
                    </GoalRoundButton>
                </Animatable.View>
                <Animatable.View ref="three" style={{ flexDirection: 'row',marginTop: 20 }}>
                    <GoalRoundButton onPress={() => this.handleButtonClick('gain' )}>
                        <Text style={styles.textStyle}>Gain Weight</Text>
                        <Text style={styles.subHeadingText}>Build muscle strength</Text>
                    </GoalRoundButton>
                </Animatable.View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        // justifyContent: 'center',
        width: '100%',
        paddingTop: 100

    },
    textStyle:{
        color:colors.primaryColor,
        fontSize: 16,
        fontWeight: '100',
    
    }, 
    headingText: {
        color: colors.white,
        fontSize: 27,
        fontWeight: '300',
        opacity: 0.95,
       
    },
    subHeadingText:{
        fontSize: 11,
        color:colors.darkGray,
        marginTop: 3,
        fontWeight: '400',
    }

});


const mapStateToProps = (state) => {
    const { goal } = state.signup;
    return { goal };
};

export default connect(mapStateToProps,{ signUpUser }) (Goals);