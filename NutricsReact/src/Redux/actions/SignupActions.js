import * as types from './types';


import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from "react-native";


export const signUpUser = ({ prop, value }) => {
    return {
        type: types.SIGNUP_USER_UPDATE,
        payload: { prop, value }
    };
};


export const signUp = ({ firstname, lastname, email, password }) => {
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    return (dispatch) => {
        dispatch({ type: types.SIGNUP_USER });
        axios.post('https://nutrics.herokuapp.com/api/auth/register', {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        }).then(function (response) {
                console.log(response);
            signupUserSuccess(dispatch,response);
            }).catch(function (error) {
                signupUserFailed(dispatch,error)
                console.log(error);
            });

    }
};
export const profileUpdate = ({ authKey, goal, gender, age, weight, height, frameSize, activityLevel, selectedAllergies, bodyfat, userCalories, userFats, userCarbs, userProtein  }) => {
    

    return (dispatch) => {
        dispatch({ type: types.PROFILE_UPDATE });
        axios.post('https://nutrics.herokuapp.com/api/account/update-profile', {
            goal: goal,
            sex: gender,
            age: age,
            weight: weight,
            height: height,
            frame: frameSize,
            activityLevel: activityLevel,
            allergies: selectedAllergies,
            bodyfat: bodyfat,
            userCalories: userCalories,
            userFats: userFats,
            userCarbs: userCarbs,
            userProtein: userProtein
        }, 
        {
            headers: 
            {
                'Authorization': authKey,
                'Content-Type': 'application/json'
                
            }
        }
    ).then(function (response) {
            console.log(response);
        profileUpdateSuccess(dispatch, response);
        }).catch(function (error) {
            profileUpdateFailed(dispatch, error)
            console.log(error);
        });

    }

};


const profileUpdateFailed = (dispatch, error) => {
    dispatch({
        type: types.PROFILE_UPDATE_FAILED,
        payload: error
    });
    console.log('Signup Failed error');
    alert('Profile update Failed')
}
const profileUpdateSuccess = (dispatch, response) => {
    dispatch({
        type: types.PROFILE_UPDATE_SUCCESS,
        payload: response
    });
  
    _storeProfileData(response);
    console.log('Signup success');

}



const signupUserFailed = (dispatch,error) => {
    dispatch({
        type: types.SIGNUP_FAILED,
        payload: error
    });
    console.log('Signup Failed error');
}
const signupUserSuccess = (dispatch, response) => {
    dispatch({
        type: types.SIGNUP_SUCCESS,
        payload: response
    });
    Actions.login();
    console.log('Signup success');

}





_storeProfileData = async (response) => {
    try {

        await AsyncStorage.setItem('profile_details', JSON.stringify(response));
        console.log('saving dat Success')
        Actions.saveMacros();
    } catch (error) {
        // Error saving data
        console.log('Error saving data')
    }
}