
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';


class ProfileEditText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secureInput: props.inputType === 'text' || props.inputType === 'email' ? false : true,
            changed:false,
        };
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this._onChangeMethod = this._onChangeMethod.bind(this);
    }
    toggleShowPassword() {
        this.setState({ secureInput: !this.state.secureInput });
    }
    _onChangeMethod(){
        if(!this.state.changed){
            this.setState({changed: true});
            this.refs.labelText.fadeIn(500)
        }else{
            
        }
    }
    returnReturnKeyType(){

    }
    focus(){
        console.log('custom focus')
        this.refs.curentRef.focus();
       
    }
    

    render() {
        const { labelText, unitText, bottomLineColor, labelColor, inputTextColor, onChangeText, inputType, myRef, onSubmitEditing, returnKeyType } = this.props;
       

        return (
            <View style={[styles.wrapper]}>
                <Animatable.Text ref="labelText" style={[{ color: labelColor,opacity: 0 }, styles.label]}>{labelText}</Animatable.Text>
                <View style={[styles.bothWrapper, { borderBottomColor: bottomLineColor}]}>
                {/* <TextInput
                    ref={'curentRef'}
                    autoCorrect={false}
                    style={[{ color: inputTextColor },
                    styles.inputField]}
                    onChangeText={onChangeText}
                    placeholder={labelText}
                    clearTextOnFocus={true}
                    onChange={this._onChangeMethod}
                    keyboardType={inputType}
                    ref={myRef}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType='done'
                    underlineColorAndroid='transparent'

                /> */}
                
                    <View style={[styles.unitView, { borderColor: bottomLineColor }]}>
                        <Text style={[styles.unitText, { color: bottomLineColor }]}>{unitText}</Text>
                </View>
                </View>
            </View>
        );
    }
}

ProfileEditText.protoTypes = {

    labelText: PropTypes.string.isRequired,
    unitText: PropTypes.string.isRequired,
    bottomLineColor: PropTypes.string,
    labelColor: PropTypes.string,
    inputTextColor: PropTypes.string,
    inputType: PropTypes.string,
    myRef: PropTypes.string,
    returnKeyType: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func


};

const styles = StyleSheet.create({

    wrapper: {
        display: 'flex',
        marginTop: 10,
        width: '100%'
    },
    label: {
        fontWeight: '100',
        marginBottom: 10,
    },
    inputField: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 16,
        height: 40,
        backgroundColor: colors.white,
        width: '90%'
    },
    showButton: {
        position: 'absolute',
        right: 0,

    },
    showButtonText: {
        fontWeight: '700'

    },
    bothWrapper:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems:'center'
    },
    unitView:{
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.primaryColor,
        borderWidth: 1,
        padding: 2,
        borderRadius: 50,
        height: 20,
        width: 30,
        position:'absolute',
        right:0,
        bottom: 0,
        marginBottom:5
    },
    unitText:{
        color: colors.primaryColor,
        fontSize:10,
        
    }


});


export { ProfileEditText };

