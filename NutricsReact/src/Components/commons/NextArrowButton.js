
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import colors from '../../styles/colors';

export default class NextArrowButton extends Component {
    render() {

        const {disabled,handleNextButton} = this.props;
        const opacityStyle = disabled ? { backgroundColor: 'rgba(33,218,149,0.2)' } : { backgroundColor: 'rgba(33,218,149,0.9)' };
        
       
        return (
            <TouchableOpacity style={[opacityStyle ,styles.button]}
                onPress={handleNextButton}
                disabled={disabled}>

                <Icon
                name="angle-right"
                color={colors.white}
                size={32}
                style={styles.icon}/>
                

            </TouchableOpacity>
        );
    }
}


NextArrowButton.propTypes = {
    disabled:PropTypes.bool,
    handleNextButton:PropTypes.func,

};



const styles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 60,
        height: 60,
        
    },
    icon: {
        marginTop:-2,
        marginRight:-2,
    },
   



});