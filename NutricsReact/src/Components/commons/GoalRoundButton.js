import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import colors from '../../styles/colors'

class GoalRoundButton extends Component {

    render() {
        const { onPress } = this.props;
        return (
            

            <TouchableOpacity 
                style={styles.container}
                onPress={onPress}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}
GoalRoundButton.propTypes = {
    onPress: PropTypes.func,
};


const styles = StyleSheet.create({

    container: {
        width: '90%',
        height: 70,
        backgroundColor: colors.white,
        shadowOffset: { width: 0,height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }


});

export { GoalRoundButton };

