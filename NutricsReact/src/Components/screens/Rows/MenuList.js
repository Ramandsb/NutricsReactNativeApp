
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
import { Card } from '../../commons/Card';



class MenuList extends Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {



    }
    componentDidMount() {

    }



    render() {
        return (

            <View
                style={styles.container}
                borderRadius={5}>

               


                {/* <Image
                    style={styles.image}
                    source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/97/2d/food-image.jpg' }} /> */}
                <Text style={{ zIndex: 5, position: 'absolute', bottom: 0, left: 0, color: colors.white }}>{this.props.name}</Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
        backgroundColor: colors.black,
        borderRadius: 5,
        height: 200,
        marginTop: 10
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 5
    },
    layer: {
        height: 200,
        width: '100%',
        zIndex: 5,
        backgroundColor: colors.black,
        opacity: 0.3,
        borderRadius: 5,
        position: 'absolute',
        top: 0
    }



});


export default MenuList;