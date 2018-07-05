
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import * as Animatable from 'react-native-animatable';


class InputField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secureInput: props.inputType === 'text' || props.inputType === 'email' ? false : true,
        };
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
    }
    toggleShowPassword() {
        this.setState({ secureInput: !this.state.secureInput });
    }
    render() {
        const { labelText, labelTextSize, labelColor,
             textColor, borderBottomColor, inputType,
              customStyle, onChangeText } = this.props;
        const fontSize = labelTextSize || 14;
        const color = labelColor || colors.white;
        const inputColor = labelColor || colors.white;
        const borderBottom = borderBottomColor || 'transparent';
        const { secureInput } = this.state;
        
        return (
            <View  style={[customStyle, styles.wrapper]}>
                <Text  style={[{ color, fontSize }, styles.label]}>{labelText}</Text>
            {inputType === 'password' ? 
            <TouchableOpacity 
            style={styles.showButton}
            onPress={this.toggleShowPassword}
            >
             <Text style={[{ color }, styles.showButtonText]}>{secureInput ? 'Show' : 'Hide'}</Text>
                </TouchableOpacity> : null}
                <TextInput
                    autoCorrect={false}
                    style={[{ color: inputColor, borderBottomColor: borderBottom },
                         styles.inputField]}
                    secureTextEntry={secureInput}
                    onChangeText={onChangeText}
                    underlineColorAndroid='transparent'
                    returnKeyType='default'
                />
            </View>
        );
    }
}

InputField.protoTypes = {

    labelText: PropTypes.string.isRequired,
    labelTextSize: PropTypes.number,
    labelTextColor: PropTypes.string,
    borderBottomColor: PropTypes.string,
    inputType: PropTypes.string,
    customStyle: PropTypes.object,
    onChangeText: PropTypes.func


};

const styles = StyleSheet.create({

    wrapper: {
        display: 'flex',
        marginTop: 10,
        width: '100%'
    },
    label: {
        fontWeight: '700',
        marginBottom: 10,
    },
    inputField: {
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    showButton: {
        position: 'absolute',
        right: 0,

    },
    showButtonText: {
        fontWeight: '700'

    }


});


export { InputField };

