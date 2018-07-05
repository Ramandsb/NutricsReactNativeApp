
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/SimpleLineIcons'; 
import OrdersTab from './Containers/OrdersTab';
import PlansTab from './Containers/PlansTab';
import StoresTab from './Containers/StoresTab';
import AccountTab from './Containers/AccountTab';



import * as Animatable from 'react-native-animatable';

import { AsyncStorage } from "react-native";

import { Spinner } from '../commons/Spinner';


import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';



class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'orders',
        };
    }

    componentWillMount() {



    }
    componentDidMount() {

    }



    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'orders'}
                    title="Order"
                    selectedTitleStyle={{ color: colors.primaryColor }}
                    renderIcon={() => <Icon name="home" size={18} color={colors.darkGray}/>}
                    renderSelectedIcon={() => <Icon name="home" size={18} color={colors.primaryColor} />}
                    // badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'orders' })}>
                    <OrdersTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'plans'}
                    title="Plans"
                    selectedTitleStyle={{ color: colors.primaryColor }}
                    renderIcon={() => <Icon name="calendar" size={18} color={colors.darkGray} />}
                    renderSelectedIcon={() => <Icon name="calendar" size={18} color={colors.primaryColor} />}
                    // badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'plans' })}>
                    <PlansTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'stores'}
                    title="Stores"
                    selectedTitleStyle={{ color: colors.primaryColor }}
                    renderIcon={() => <Icon name="location-pin" size={18} color={colors.darkGray} />}
                    renderSelectedIcon={() => <Icon name="location-pin" size={18} color={colors.primaryColor} />}
                    // badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'stores' })}>
                    <StoresTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'account'}
                    title="Account"
                    selectedTitleStyle={{ color: colors.primaryColor }}
                    renderIcon={() => <Icon name="user" size={18} color={colors.darkGray} />}
                    renderSelectedIcon={() => <Icon name="user" size={18} color={colors.primaryColor} />}
                    // badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'account' })}>
                    <AccountTab />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
    },
    logo: {
        width: 200,
        height: 50,

    },


});


export default HomePage;