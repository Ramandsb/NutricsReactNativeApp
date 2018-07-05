import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

class Header extends Component {
    render() {
        const { headerText } = this.props;
        return (
            <View style={styles.header}>
                <Text style={{ fontSize: 20 }}>{headerText}</Text>
            </View>
        );
     }
}

Header.propTypes = {
    headerText: PropTypes.string.isRequired,

};


const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,

    },
   
});


export { Header };
