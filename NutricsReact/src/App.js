/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { InputField } from '../src/Components/commons/InputField';
import { Card } from '../src/Components/commons/Card';
import { BuyNowButton } from '../src/Components/commons/BuyNowButton';
import reducers from './Redux/reducers';
import ReduxThunk from 'redux-thunk';

import colors from './styles/colors';


import Login from './Components/screens/Login';
import Router from './Router';



export default class App extends Component {
  render() {
    return (
     
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <View style={{flex:1}}>
       <Router/>
        </View>
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 50,
    marginTop: 70,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
    padding: 20
  },
  loginText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 30,
    color: colors.darkGray
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,

  },
  forgotPasswordText: {
    color: colors.primaryColor
  },
  signupWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25
  },
  newTo: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.darkGray
  },
  signupText: {
    color: colors.primaryColor
  }


});
