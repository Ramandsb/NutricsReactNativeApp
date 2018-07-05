import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

class Spinner extends Component {
    render() {
        const { size } = this.props;
        return (
            <View style={styles.SpinnerStyle}>
                <ActivityIndicator  size={size || 'large'} />
            </View>
        );
    }
}

Spinner.propTypes = {
    size: PropTypes.string,

};


const styles = StyleSheet.create({
    SpinnerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },

});


export { Spinner };
