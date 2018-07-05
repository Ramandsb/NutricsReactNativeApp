import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


import colors from '../../styles/colors'


class BuyNowButton extends Component {

    render() {
        const { text, color, onPress } = this.props;
        // const borderColor = color;
        const backgroundColor = color;


        return (

            <TouchableOpacity 
                style={[{ backgroundColor }, styles.container]}
            onPress={onPress}
            >
                {/* <Text style={[{ color }, styles.text]}>{text}</Text> */}
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

BuyNowButton.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onPress: PropTypes.func,
};


const styles = StyleSheet.create({

    container: {
        // borderWidth: 1,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 40,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,

    },
    text: { 
        fontSize: 14,
        fontWeight: '500',
        color: colors.white
    }


});

export { BuyNowButton };
