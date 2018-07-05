
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
    KeyboardAvoidingView
} from 'react-native';
import { AsyncStorage } from "react-native";

import { connect } from 'react-redux';
import { signUpUser } from '../../Redux/actions/SignupActions';
import { profileUpdate } from '../../Redux/actions/SignupActions';

import * as Animatable from 'react-native-animatable';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { CheckBox } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';


import { InputField } from '../commons/InputField';
import { Card } from '../commons/Card';
import { BuyNowButton } from '../commons/BuyNowButton';
import { CircularButton } from '../commons/CircularButton';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';
import { ProfileEditText } from '../commons/ProfileEditText';
import { Slider } from 'react-native-elements'
import { PASSWORD_CHANGED } from '../../Redux/actions/types';
const items = [{
    name: "Poultry",
    id: 'poultry',
}, {
    name: "Eggs",
    id: 'eggs',
}, {
    name: "Beef",
    id: 'beef',
}, {
    name: "Seafood",
    id: 'seafood',
}];

const allergies = [{
    name: "Milk",
    id: 'milk',
}, {
    name: "Eggs",
    id: 'eggs',
}, {
    name: "Crustacean shellfish",
    id: 'crus',
}, {
    name: "Tree nuts",
    id: 'treenuts',
}, {
    name: "Wheat",
    id: 'wheat',
}, {
    name: "Soyabeans",
    id: 'soyabeans',
}];

const SCREEN_SIZE = Dimensions.get('window').height;

class FoodPreffs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            selectedItems: [],
            selectedAllergies: [],
            eatMeat:'',
            allergyMargin: -100,
            value: 0,
            goal: '',
            gender: '',
            age: '',
            weight: '',
            height: '',
            frameSize: '',
            activityLevel: '',
            bodyfat: '',
            authKey: ''
        }
    }
    componentWillMount(){
        this.retrieveData()
        this.retrieveAuthKeyData()
    }

    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
        this.props.
            signUpUser({ prop: 'meatChoices', value: selectedItems });
    }
    onSelectedAllergyItemsChange = (selectedAllergies) => { 
            this.setState({ selectedAllergies });
        this.props.
            signUpUser({ prop: 'allergies', value: selectedAllergies });
    }

    onSelectMeatChoice(index, value) {
        // this.setState({
        //     meatSelection: `Selected index: ${index} , value: ${value}`
        // })

        if(value==='yes'){
            this.refs.meatPrefRef.fadeInUp(500);
            this.setState({allergyMargin: 10})
            this.setState({ eatMeat: 'yes' })

        }else{
            this.refs.meatPrefRef.fadeOutDown(500);
            this.setState({ allergyMargin: -100 })
            this.setState({ eatMeat: 'no' })
        }
        this.props.
            signUpUser({ prop: 'eatMeat', value: value });

    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('profile_details');
            if (value !== null) {
                // We have data!!
                console.log(value);
                let parsed = JSON.parse(value);
                this.setState({goal: parsed.goal})
                this.setState({ gender: parsed.gender })
                this.setState({ age: parsed.age })
                this.setState({ bodyfat: parsed.bodyfat })
                this.setState({ weight: parsed.weight })
                this.setState({ height: parsed.height })
                this.setState({ frameSize: parsed.frameSize })
                this.setState({ activityLevel: parsed.activityLevel })
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    _handleDoneButtonClick(){
        console.log(this.state.goal)
        console.log(this.state.gender)
        console.log(this.state.age)
        console.log(this.state.weight)
        console.log(this.state.height)
        console.log(this.state.frameSize)
        console.log(this.state.activityLevel)
        console.log(this.state.selectedItems)
        console.log(this.state.selectedAllergies)
        this.props.profileUpdate({
            authKey: this.state.authKey,
            goal: this.state.goal, 
            gender: this.state.gender, 
            age: this.state.age,
            weight: this.state.weight,
            height: this.state.height, 
            frameSize: this.state.frameSize, 
            activityLevel: this.state.activityLevel, 
            selectedAllergies: this.state.selectedAllergies, 
            bodyfat: this.state.bodyfat, 
            userCalories: 2000,
            userFats: 50,
            userCarbs: 200, 
            userProtein: 200
    });
        
    }

    retrieveAuthKeyData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!

                let parsed = JSON.parse(value);
                console.log("parsed \n" + parsed.data.token);
                this.setState({ authKey: parsed.data.token});
            }
        } catch (error) {
            // Error retrieving data
            console.log(error + "error")
        }
    }

    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <ScrollView style={{flex:1}}>

                <View style={styles.topTitle}>
                    <Animatable.Text ref="titleTextRef" animation="zoomIn" style={styles.titleTextRefStyle}>Your Food Prefferences</Animatable.Text>
                </View>
                <View style={styles.frameView}>
                    <Text style={styles.frameViewTitle}>Do you eat meat?</Text>
                    <RadioGroup
                            onSelect={(index, value) => this.onSelectMeatChoice(index, value)}
                        color={colors.primaryColor}>
                        <RadioButton value={'yes'} >
                            <Text>Yes</Text>
                        </RadioButton>

                        <RadioButton value={'no'}>
                            <Text>No</Text>
                        </RadioButton>
                    </RadioGroup>
                </View>

                <Animatable.View ref="meatPrefRef" style={{ marginLeft: 30, marginRight: 30,opacity:0 }}>
                    <Text style={{ marginBottom: 10 }}>Select your meat Prefferences</Text>
                    <MultiSelect
                        items={items}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Please select"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={(text) => console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#ccc"
                        selectedItemIconColor="#ccc"
                        itemTextColor="#000"
                        displayKey="name"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor={colors.primaryColor}
                        tagTextColor={colors.primaryColor}
                        searchInputStyle={{ color: colors.white, opacity: 1 }}
                        submitButtonColor={colors.primaryColor}
                        submitButtonText="Submit"
                    />

                </Animatable.View>
                <Animatable.View style={{ marginLeft: 30, marginRight: 30, marginTop: this.state.allergyMargin}}>
                    <Text style={{ marginBottom: 10 }}>Do you have any allergies?</Text>
                    <MultiSelect
                        hideTags
                        items={allergies}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedAllergyItemsChange}
                        selectedItems={this.state.selectedAllergies}
                        selectText="Please select"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={(text) => console.log(text)}
                        selectedItemTextColor="#ccc"
                        selectedItemIconColor="#ccc"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: colors.white, opacity: 1 }}
                        submitButtonColor={colors.primaryColor}
                        submitButtonText="Submit"
                    />

                </Animatable.View>
                    <View style={{  height: 40, width: 130, alignSelf: 'flex-end',margin:40,marginBottom:100 }}>
                    <CircularButton
                        text='Done'
                        color={colors.primaryColor}
                        selected={true}
                            onPress={() => this._handleDoneButtonClick()}
                    />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,

    },
    titleTextRefStyle: {
        color: colors.primaryColor,
        fontSize: 25,
        fontWeight: '200',
        shadowColor: colors.primaryColor,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        elevation: 10,
    },
    frameViewTitle: {
        alignItems: 'flex-start',
        marginTop: 30,

    },
    frameView: {
        margin: 30,

    },
    topTitle: {
        width: '100%',
        height: 100,
        backgroundColor: colors.white,
        zIndex: 500,
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    meatTitle: {
        fontSize: 20,
        fontWeight: '200',
        margin: 30,
        marginTop: 50
    }

});



const mapStateToProps = (state) => {
    const { eatMeat, meatChoices,
        allergies } = state.signup;
    return {
        eatMeat, meatChoices,
        allergies
    };
};


export default connect(mapStateToProps, { signUpUser, profileUpdate })( FoodPreffs );