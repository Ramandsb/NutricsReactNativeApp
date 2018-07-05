
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
import * as Animatable from 'react-native-animatable';

import { AsyncStorage } from "react-native";

import { Spinner } from '../commons/Spinner';


import colors from '../../styles/colors/index';
import { Actions } from 'react-native-router-flux';



class SplashScreen extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            timePassed: false,
            profile_complete: false,
            
        };
    }
   
    componentWillMount(){
        this.retrieveData();
      
        

    }
    


    
    ShowAlertWithDelay = () => {
      
        setTimeout(() => {

            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            console.log("Timer done")
            // Actions.auth()
            this.setState({timePassed: true})
            
        }, 3000);


    }
   
    

    retrieveData = async () => {
        // console.log("called retrieve")
        try {
            console.log("try")
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                console.log("value")
                console.log(value);
                this.setState({ loggedIn: true });
                // Actions.auth()
                console.log(this.state.loggedIn)
                this.retrieveProfileCompleteData()
               
            }else{
                console.log("nulll value")
                this.setState({ loggedIn: false });
                console.log(this.state.loggedIn)
                // Actions.unAuth()
                this.ShowAlertWithDelay()
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    retrieveProfileCompleteData = async () => {
        // console.log("called retrieve")
        try {
            console.log("try")
            const value = await AsyncStorage.getItem('profile_complete');
            if (value !== null) {
                // We have data!!
                console.log("value")
                console.log(value);
                this.setState({ profile_complete: true });
                this.ShowAlertWithDelay()
             
            } else {
                console.log("nulll value")
                this.setState({ profile_complete: false });
                this.ShowAlertWithDelay()
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    
    render() {
        if(this.state.timePassed){
            if (this.state.loggedIn){
                if (this.state.profile_complete) {
                    Actions.mainpage()
                    console.log(this.state.loggedIn) 
                }else{
                Actions.auth()
                console.log(this.state.loggedIn)
            }
            }else{
                Actions.unAuth()
                console.log(this.state.loggedIn)
            }

        }
        return (
            <View style={styles.container}>

            <Animatable.View animation="zoomIn" style={{marginBottom:-250}}>
                <Image
                    style={styles.logo}
                    source={require('../../img/logowhite.png')} />
            </Animatable.View>
                <ActivityIndicator/>    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.primaryColor,
    },
    logo: {
        width: 200,
        height: 50,
       
    },
    

});


export default SplashScreen;