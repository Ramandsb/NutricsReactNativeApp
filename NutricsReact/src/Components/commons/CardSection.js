import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

class CardSection extends Component {

    render() {
        return (

            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        shadowColor: '#000',
        backgroundColor: '#fff',
        padding: 5,
        flexDirection: 'row',
        position: 'relative'


    }


});

export { CardSection };

