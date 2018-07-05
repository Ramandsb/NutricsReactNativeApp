
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
    Dimensions,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import { AsyncStorage } from "react-native";

import { connect } from 'react-redux';
import { signUpUser } from '../../Redux/actions/SignupActions';

import * as Animatable from 'react-native-animatable';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import {
    Sae,
    Hoshi
} from 'react-native-textinput-effects';



import { InputField } from '../commons/InputField';
import { Card } from '../commons/Card';
import { BuyNowButton } from '../commons/BuyNowButton';
import { CircularButton } from '../commons/CircularButton';


import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';
import { ProfileEditText } from '../commons/ProfileEditText';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
const  SCREEN_SIZE = Dimensions.get('window').height;

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maleSelected: true,
            femaleSelected: true,
            sectionTwoVisible: false,
            goalValue:''
           
            // activityLevel
        }

        this.handleMaleButton = this.handleMaleButton.bind(this);
        this.handleFemaleButton = this.handleFemaleButton.bind(this);
        this.moveUpSectionTwo = this.moveUpSectionTwo.bind(this);
        this.handleSectionTwoButton = this.handleSectionTwoButton.bind(this);
        this.onSelectFrame = this.onSelectFrame.bind(this);
        this.onSelectActivity = this.onSelectActivity.bind(this);

    }
    onSelectFrame(index, value) {
       
        this.props.
            signUpUser({ prop: 'frameSize', value: value });
       
    }
    onSelectActivity(index, value) {
        // this.setState({
        //     activityLevel: `Selected index: ${index} , value: ${value}`
        // })
        this.props.
            signUpUser({ prop: 'activityLevel', value: value });

    }
    componentDidMount() {

        this.retrieveData();
        this.refs.sectionOne.fadeInUp(2000);
        if(!this.state.sectionTwoVisible){
            // this.refs.sectionTwo.fadeOut(0.5);
            
        }
        // this.retrieveData();
    }
    componentWillMount(){
        this.sectionTwoHeight = new Animated.Value(0);
       
    }


    handleMaleButton() {
        this.setState({ maleSelected: true });
        this.setState({ femaleSelected: false })
        if (!this.state.sectionTwoVisible) {
            this.moveUpSectionTwo(this.sectionTwoHeight);
            this.props.
                signUpUser({ prop: 'gender', value: 'male' });
            this.refs.sectionTwo.fadeInLeft(1500);
            this.setState({sectionTwoVisible: true})
            this.refs.sectionOneText.fadeOut(500);
            this.refs.titleTextRef.zoomIn(500);
        }
    }
    handleFemaleButton() {
        this.setState({ maleSelected: false });
        this.setState({ femaleSelected: true });
        if (!this.state.sectionTwoVisible) {
            this.props.
                signUpUser({ prop: 'gender', value: 'female' });
            this.moveUpSectionTwo();
            this.refs.sectionTwo.fadeInRight(2000);
            this.setState({ sectionTwoVisible: true })
            this.refs.sectionOneText.fadeOutUp(500);
            this.refs.titleTextRef.zoomIn(500);
        }
    }
    handleSectionTwoButton(){

    }
   

    moveUpSectionTwo(){
        Animated.timing(this.sectionTwoHeight,{
            toValue: SCREEN_SIZE,
            duration: 1000
        }).start(()=>{
            this.ageTextInput.focus()
        })
    }

    _storeData = async (data) => {
        try {

            await AsyncStorage.setItem('profile_details', JSON.stringify(data));
            console.log('saving dat Success')
            Actions.proFoodpreffs()
        } catch (error) {
            // Error saving data
            console.log('Error saving data'+error)
        }
    }
    _handleNextButtonClick(){
        
        let data = {
            goal: this.state.goalValue,
            gender: this.props.gender,
            bodyFat: this.props.bodyFat,
            age: this.props.age,
            weight: this.props.weight,
            height: this.props.height,
            frameSize: this.props.frameSize,
            activityLevel: this.props.activityLevel,

        }
        this._storeData(data);
        console.log('state'+this.state.goalValue)

    }
    
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('profile_details');
            if (value !== null) {
                // We have data!!
                console.log("value"+value);
                let parsed = JSON.parse(value)
                console.log("parsed" + parsed.goal);
                this.setState({goalValue: parsed.goal})
                

            }
        } catch (error) {
            // Error retrieving data
            console.log(error+ "error")
        }
    }
   

    render() {
        
       
        return (
            <View style={styles.container}>

            <View style={styles.topTitle}>
                    <Animatable.Text ref="titleTextRef" style={styles.titleTextRefStyle}>Your Profile</Animatable.Text>
            </View>

                <View style={styles.scrollViewContainer}>
                    <ScrollView style={styles.scrollView}> 
                        <Animatable.View ref="sectionOne" style={styles.sectionOne}>

                    <Animatable.View ref="sectionOneText" style={styles.textsWrapper}>

                                <Text style={styles.hiWrapper}>Hi!</Text>
                                <Text style={styles.letsWrapper}>Let's Start with basics</Text>

                    </Animatable.View>


                            <View style={styles.genderButton}>

                                <View style={{ marginTop: 40, height: 40, width: 130, marginBottom: 20 }}>
                                    <CircularButton
                                        text='Male'
                                        color={colors.primaryColor}
                                        disabled={true}
                                        onPress={this.handleMaleButton}
                                        selected={this.state.maleSelected}
                                    />
                                </View>
                        <View style={{ marginTop: 40, height: 40, width: 130, marginBottom: 20 }}>
                                    <CircularButton
                                        text='Female'
                                        color={colors.primaryColor}
                                        selected={this.state.femaleSelected}
                                        onPress={this.handleFemaleButton}
                                    />
                                </View>
                            </View>


                        </Animatable.View >
                        <Animatable.View ref="sectionTwo" style={[{ height: this.sectionTwoHeight },styles.sectionTwo]}>
                            <KeyboardAvoidingView behavior='padding'  style={[styles.sectionTwoFullWidth]}>
                                <View style={{ marginTop: 10, marginBottom: -2}}>
                                    <Hoshi
                                        ref={(input) => { this.ageTextInput = input }}
                                        label={'Your Age?'}
                                        labelStyle={{ color: colors.primaryColor, marginLeft: -12 }}
                                        inputStyle={{ fontSize:14,fontWeight:'400',marginBottom:-5 }}
                                        borderColor={'#b76c94'}
                                        autoCorrect={false}
                                        keyboardType={'numeric'}
                                        returnKeyType={'done'}
                                        onChangeText={value => this.props.
                                            signUpUser({ prop: 'age', value: value })}
                                        onSubmitEditing={() => { this.weightTextInput.focus() }}
                                    />
                                    <View style={[styles.unitView, { borderColor: colors.primaryColor,marginBottom:12 }]}>
                                        <Text style={[styles.unitText, { color: colors.primaryColor }]}>years</Text>
                                    </View>
                                    </View>
                                <View style={{ marginTop: 10, marginBottom: -2 }}>
                                    <Hoshi
                                        ref={(input) => { this.weightTextInput = input }}
                                        label={'Your Weight?'}
                                        labelStyle={{ color: colors.primaryColor, marginLeft: -12 }}
                                        inputStyle={{ fontSize: 14, fontWeight: '400', marginBottom: -5 }}
                                        borderColor={'#b76c94'}
                                        autoCorrect={false}
                                        keyboardType="number-pad"
                                        onChangeText={value => this.props.
                                            signUpUser({ prop: 'weight', value: value })}
                                        returnKeyType={'done'}
                                        onSubmitEditing={() => { this.heightTextInput.focus() }}
                                    />
                                    <View style={[styles.unitView, { borderColor: colors.primaryColor, marginBottom: 12 }]}>
                                        <Text style={[styles.unitText, { color: colors.primaryColor }]}>Kg</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, marginBottom: -2 }}>
                                    <Hoshi
                                        ref={(input) => { this.heightTextInput = input }}
                                        label={'Your Height?'}
                                        labelStyle={{ color: colors.primaryColor, marginLeft: -12 }}
                                        inputStyle={{ fontSize: 14, fontWeight: '400', marginBottom: -5 }}
                                        borderColor={'#b76c94'}
                                        autoCorrect={false}
                                        onChangeText={value => this.props.
                                            signUpUser({ prop: 'height', value: value })}
                                        keyboardType="number-pad"
                                        returnKeyType={'done'}
                                        onSubmitEditing={() => { this.bodyFatTextInput.focus() }}
                                    />
                                    <View style={[styles.unitView, { borderColor: colors.primaryColor, marginBottom: 12 }]}>
                                        <Text style={[styles.unitText, { color: colors.primaryColor }]}>cm</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, marginBottom: -2 }}>
                                    <Hoshi
                                        ref={(input) => { this.bodyFatTextInput = input }}
                                        label={'Your body fat?'}
                                        autoCorrect={false}
                                        keyboardType="number-pad"
                                        returnKeyType={'done'}
                                        onChangeText={value => this.props.
                                            signUpUser({ prop: 'bodyFat', value: value })}
                                        labelStyle={{ color: colors.primaryColor, marginLeft: -12 }}
                                        inputStyle={{ fontSize: 14, fontWeight: '400', marginBottom: -5 }}
                                        borderColor={'#b76c94'}
                                    />
                                    <View style={[styles.unitView, { borderColor: colors.primaryColor, marginBottom: 12 }]}>
                                        <Text style={[styles.unitText, { color: colors.primaryColor }]}>%</Text>
                                    </View>
                                </View>
                                
                                <View style={{flexDirection:'row',marginTop:10}}>

                                <View style={styles.frameView}> 
                                    <Text style={styles.frameViewTitle}>What's you frame size?</Text>
                                    <RadioGroup
                                        onSelect={(index, value) => this.onSelectFrame(index, value)}
                                        color={colors.primaryColor}>
                                        <RadioButton value={'S'} >
                                            <Text>small</Text>
                                        </RadioButton>

                                        <RadioButton value={'M'}>
                                            <Text>Medium</Text>
                                        </RadioButton>

                                        <RadioButton value={'L'}>
                                            <Text>Large</Text>
                                        </RadioButton>
                                    </RadioGroup>
                                </View>   
                                <View style={[styles.frameView,{marginLeft: 20}]}>
                                    <Text style={styles.frameViewTitle}>How active are you?</Text>
                                    <RadioGroup
                                        onSelect={(index, value) => this.onSelectActivity(index, value)}
                                        color={colors.primaryColor}>
                                            <RadioButton value={'LIGHT'} >
                                            <Text>Light</Text>
                                        </RadioButton>

                                            <RadioButton value={'MODERATE'}>
                                            <Text>Moderate</Text>
                                        </RadioButton>

                                            <RadioButton value={'VERY_ACTIVE'}>
                                            <Text>Very Active</Text>
                                        </RadioButton>
                                    </RadioGroup>
                                </View>    
                                
                                </View>
                           

                        <View style={{ marginTop: 40, height: 40, width: 130, alignSelf: 'flex-end'}}>
                            <CircularButton
                                text='Next'
                                color={colors.primaryColor}
                                selected={true}
                                onPress={()=>this._handleNextButtonClick()}
                            />
                        </View>
                            </KeyboardAvoidingView >
                        </Animatable.View >
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
        backgroundColor: colors.white,
        justifyContent: 'center',
        width:'100%'
       
    },
    scrollViewContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView:{
        width: '100%',
    },
    genderButton: {
        flexDirection: 'row'
    },
    sectionOne: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        width: '100%',
        marginTop: 30
       
    },
    textsWrapper: {
        alignItems: 'center'

    },
    hiWrapper: {
        fontSize: 35,
        fontWeight: '200'

    },
    letsWrapper: {
        fontSize: 12,
        fontWeight: '200',
        color: colors.black,
        fontFamily: 'Arial'


    },
    buttonWrapper: {
        height: 40,
        width: '80%',
        marginTop: 40,
        alignSelf: 'center'

    },
    sectionTwo: {
        marginTop: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        width: '100%',
        opacity: 0,
        backgroundColor:colors.white
    },
    sectionTwoFullWidth:{
        width: '100%',
        padding: 20
    },
    topTitle:{
        width: '100%',
        height: 100,
        position: 'absolute',
        top: 0,
        backgroundColor: colors.white,
        zIndex: 500,
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
       
    },
    titleTextRefStyle:{
        color: colors.primaryColor,
        fontSize: 25,
        fontWeight: '200',
        shadowColor: colors.primaryColor,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        elevation: 10,
        opacity: 0

    },
    frameViewTitle:{
        alignItems: 'flex-start',
        marginTop: 30
    },
    unitView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.primaryColor,
        borderWidth: 1,
        padding: 2,
        borderRadius: 50,
        height: 20,
        width: 30,
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginBottom: 5
    },
    unitText: {
        color: colors.primaryColor,
        fontSize: 10,

    }
    


});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});


const mapStateToProps = (state) => {
    const { gender, age, weight,
        height, bodyFat, frameSize,
        activityLevel } = state.signup;
    return {
        gender, age, weight,
        height, bodyFat, frameSize,
        activityLevel };
};

export default connect(mapStateToProps, { signUpUser })( Account );