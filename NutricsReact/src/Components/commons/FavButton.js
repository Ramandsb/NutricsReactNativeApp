import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


import colors from '../../styles/colors'


class FavButton extends Component {

    render() {
        const { text, color, onPress, selected } = this.props;
        // const borderColor = color;
        const backgroundColor = color;
        // const opacity = selected ? { opacity: 0.2 } : { opacity: 0.9 }
        const opacityStyle = selected ? { backgroundColor: 'rgba(33,218,149,0.9)' } : { backgroundColor: 'rgba(33,218,149,0.2)' };


        // console.log('selected '+text+'//'+selected);
        // console.log('selected ' + text + '//' + opacityStyle);


        return (

            <TouchableOpacity
                // style={[{ backgroundColor }, opacity, styles.container]}
                style={[opacityStyle, styles.container]}

                onPress={onPress}>

                {/* <Text style={[{ color }, styles.text]}>{text}</Text> */}
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

FavButton.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onPress: PropTypes.func,
    selected: PropTypes.bool
};


const styles = StyleSheet.create({

    container: {
        // borderWidth: 1,
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
        height: 40,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        shadowColor: colors.primaryColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 10,

    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.white
    }


});

export { FavButton };
