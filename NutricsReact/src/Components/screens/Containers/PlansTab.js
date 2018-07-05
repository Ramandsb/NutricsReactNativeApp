
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

import colors from '../../../styles/colors/index';
import { Actions } from 'react-native-router-flux';


class PlansTab extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            timePassed: false,

        };
    }

    componentWillMount() {



    }
    componentDidMount() {

    }



    render() {
        return (
            <View style={styles.container}>

                <Text> PlansTab</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
    },
    logo: {
        width: 200,
        height: 50,

    },


});


export default PlansTab;