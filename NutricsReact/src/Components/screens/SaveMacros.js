
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { AsyncStorage } from "react-native";
import { connect } from 'react-redux';

import { Spinner } from '../commons/Spinner';
import { CircularButton } from '../commons/CircularButton';
import { profileUpdate } from '../../Redux/actions/SignupActions';

import Slider from 'react-native-slider';

import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';



class SaveMacros extends Component {


    constructor(props) {
        super(props);
        this.state = {
            calories: 0,
            carbs: 0,
            protiens: 0,
            fats: 0,
            selectedItems: [],
            selectedAllergies: [],
            goal: '',
            gender: '',
            age: '',
            weight: '',
            height: '',
            frameSize: '',
            activityLevel: '',
            bodyfat: '',
            authKey: ''

        };
        this._handleDoneButtonClick = this._handleDoneButtonClick.bind(this);
    }

    componentWillMount() {
        this.retrieveData();
        this.retrieveAuthKeyData();
    }
    componentDidMount() {

    }

    _handleDoneButtonClick() {
        // console.log(this.state.goal)
        // console.log(this.state.gender)
        // console.log(this.state.age)
        // console.log(this.state.weight)
        // console.log(this.state.height)
        // console.log(this.state.frameSize)
        // console.log(this.state.activityLevel)
        // console.log(this.state.selectedItems)
        // console.log(this.state.selectedAllergies)
        // this.props.profileUpdate({
        //     authKey: this.state.authKey,
        //     goal: this.state.goal,
        //     gender: this.state.gender,
        //     age: this.state.age,
        //     weight: this.state.weight,
        //     height: this.state.height,
        //     frameSize: this.state.frameSize,
        //     activityLevel: this.state.activityLevel,
        //     selectedAllergies: this.state.selectedAllergies,
        //     bodyfat: this.state.bodyfat,
        //     userCalories: this.state.calories,
        //     userFats: this.state.fats,
        //     userCarbs: this.state.carbs,
        //     userProtein: this.state.protiens,
        // });

        let data = {
            profile_complete: 'yes'
        }
        this._storeProfileCompleteData(data);



    }

retrieveData = async () => {
    console.log("called retrieve")
    try {
        console.log("try")
        const value = await AsyncStorage.getItem('profile_details');
        if (value !== null) {
            // We have data!!
            console.log("value")
            console.log(value);
            let parsed = JSON.parse(value);
            this.setState({weight: parsed.data.weight});
            this.setState({ height: parsed.data.height });
            this.setState({ gender: parsed.data.sex });
            this.setState({ age: parsed.data.age });
            this.setState({ bodyfat: parsed.data.bodyfat });

            this.setState({ selectedAllergies: parsed.data.allergies });
            this.setState({ bodyfat: parsed.data.bodyfat });

            this.setState({ goal: parsed.data.goal });
            this.setState({ activityLevel: parsed.data.activityLevel });

            this.setState({ calories: parsed.data.macros.macros.calories });
            this.setState({ carbs: parsed.data.macros.macros.carbs });
            this.setState({ protiens: parsed.data.macros.macros.protein });
            this.setState({ fats: parsed.data.macros.macros.fats });
            console.log(parsed.data.sex);

        } else {
            console.log("nulll value")
        }
    } catch (error) {
        // Error retrieving data
        console.log('Error retrieving data ' + error)
    }
}
    retrieveAuthKeyData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!

                let parsed = JSON.parse(value);
                console.log("parsed \n" + parsed.data.token);
                this.setState({ authKey: parsed.data.token });
            }
        } catch (error) {
            // Error retrieving data
            console.log(error + "error")
        }
    }

    caloriesChange(){
        
        this.changeProtiens()
        // this.changeFats()
    }
    changeProtiens = async() => {
        var calories = this.state.calories;
        var carbs = this.state.carbs;
        var protiens = this.state.protiens;
        var fats = this.state.fats;

        protiens = (calories - (fats * 9) - (carbs * 4)) / 4
        this.setState({ protiens: protiens});
        // carbs = (calories - (protiens * 4) - (fats * 9)) / 4
        // this.setState({ carbs: this.changeCarbs()});
        // fats = (calories - (protiens * 4) - (carbs * 4)) / 9
        // this.setState({ fats: this.changeFats() });

        console.log(protiens);
        console.log(carbs);
        console.log(fats);
        console.log(calories);
        

       
        
    }
    changeCarbs() {
        var calories = this.state.calories;
        var carbs = this.state.carbs;
        var protiens = this.state.protiens;
        var fats = this.state.fats;

        carbs = (calories - (protiens * 4) - (fats * 9))/4
       
        return carbs;

    }
    changeFats() {
        var calories = this.state.calories;
        var carbs = this.state.carbs;
        var protiens = this.state.protiens;
        var fats = this.state.fats;

        fats = (calories - (protiens * 4) - (carbs * 4))/9
        return fats;
        
    }
    onChangeCarbs(value){
       
        var carbs = value;
        var protiens = this.state.protiens;
        var fats = this.state.fats;

        this.setState({ carbs: value })
         var calories = (carbs * 4) + (protiens * 4) + (fats * 9);
         this.setState({calories: calories});

    }
    onChangeProtiens(value) {
        var carbs = this.state.carbs;
        var protiens = value;
        var fats = this.state.fats;

        this.setState({ protiens: value })
        var calories = (carbs * 4) + (protiens * 4) + (fats * 9);
        this.setState({ calories: calories });
    }
    onChangeFats(value) {
        var carbs = this.state.carbs;
        var protiens = this.state.protiens;
        var fats = value;

        this.setState({ fats: value })
        var calories = (carbs * 4) + (protiens * 4) + (fats * 9);
        this.setState({ calories: calories });
    }
    _storeProfileCompleteData = async (response) => {
        try {
            await AsyncStorage.setItem('profile_complete', JSON.stringify(response));
            console.log('saving dat Success')
            Actions.mainpage();
        } catch (error) {

            console.log('Er' + error)
        }
    }



    render() {
        return (
            <View style={styles.container}>

                <View style={styles.topTitle}>
                    <Animatable.Text animation="zoomIn" style={styles.titleTextRefStyle}>Macros</Animatable.Text>
                </View>

                <View style={styles.macroCointainer}>
                    <View style={styles.cardStyle}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>Calories</Text>
                            <Text>{this.state.calories} Kcal</Text>
                        </View>
                        <Slider
                            value={this.state.calories}
                            minimumValue={500}
                            maximumValue={6000}
                            step={200}
                            minimumTrackTintColor={colors.primaryColor}
                            // maximumTrackTintColor={colors.darkOrange}
                            animateTransitions={true}
                            debugTouchArea={false}
                            thumbTintColor={colors.white}
                            thumbStyle={styles.thumbStyle}
                            thumbTouchSize={{ width: 60, height: 60 }}
                            onValueChange={(value) => this.setState({ calories: value})}
                            onSlidingComplete={() => this.caloriesChange()}/>

                    </View>
                    <View style={[styles.cardStyle,{marginTop:50}]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>Carbohydrates</Text>
                            <Text>{this.state.carbs} grams</Text>
                        </View>
                        <Slider
                            value={this.state.carbs}
                            minimumValue={20}
                            maximumValue={1500}
                            step={20}
                            minimumTrackTintColor={colors.primaryColor}
                            // maximumTrackTintColor={colors.darkOrange}
                            animateTransitions={true}
                            debugTouchArea={false}
                            thumbTintColor={colors.white}
                            thumbStyle={styles.thumbStyle}
                            thumbTouchSize={{ width: 60, height: 60 }}
                            onValueChange={(value) => this.onChangeCarbs(value)} />

                    {/* </View> */}
                    {/* <View style={styles.cardStyle}> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>Protien</Text>
                            <Text>{this.state.protiens} grams</Text>
                        </View>
                        <Slider
                            value={this.state.protiens}
                            minimumValue={20}
                            maximumValue={1500}
                            step={20}
                            minimumTrackTintColor={colors.primaryColor}
                            // maximumTrackTintColor={colors.darkOrange}
                            animateTransitions={true}
                            debugTouchArea={false}
                            thumbTintColor={colors.white}
                            thumbStyle={styles.thumbStyle}
                            thumbTouchSize={{ width: 60, height: 60 }}
                            onValueChange={(value) => this.onChangeProtiens(value)} />

                    {/* </View> */}
                    {/* <View style={styles.cardStyle}> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>Fats</Text>
                            <Text>{this.state.fats} grams</Text>
                        </View>
                        <Slider
                            value={this.state.fats}
                            minimumValue={20}
                            maximumValue={666}
                            step={10}
                            minimumTrackTintColor={colors.primaryColor}
                            // maximumTrackTintColor={colors.darkOrange}
                            animateTransitions={true}
                            debugTouchArea={false}
                            thumbTintColor={colors.white}
                            thumbStyle={styles.thumbStyle}
                            thumbTouchSize={{ width: 60, height: 60 }}
                            onValueChange={(value) => this.onChangeFats(value)} />
                    </View>
                </View>

                <View style={{ marginTop: 40, height: 40, width: '70%',height:50, alignSelf: 'center' }}>
                    <CircularButton
                        text='Update'
                        color={colors.primaryColor}
                        selected={true}
                        onPress={() => this._handleDoneButtonClick()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: colors.white
    },
    topTitle: {
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
    titleTextRefStyle: {
        color: colors.primaryColor,
        fontSize: 25,
        fontWeight: '200',
        shadowColor: colors.primaryColor,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        elevation: 10,
        opacity: 0

    },
    cardStyle: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 10,
        backgroundColor: colors.white

    },
    macroCointainer: {
        marginTop: 150,
        backgroundColor: colors.white,
        marginLeft: 10,
        marginRight: 10
    },
    thumbStyle: {
        borderColor: colors.black,
        borderWidth: 0.2,
        borderRadius: 40,
        opacity: 1,


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


export default connect(mapStateToProps, { profileUpdate })(SaveMacros);