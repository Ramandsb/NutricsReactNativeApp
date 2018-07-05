import { EMAIL_CHANGED } from "../actions/types";
import { PASSWORD_CHANGED } from "../actions/types";
import { LOGIN_USER_SUCCESS } from "../actions/types";
import { LOGIN_USER_FAILED } from "../actions/types";
import { LOGIN_USER } from "../actions/types";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { AsyncStorage } from "react-native";

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    console.log('hello'+email);
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then(user => loginUserSuccess(dispatch, user))
        //     .catch(() => {
        //         firebase.auth().createUserWithEmailAndPassword(email, password)
        //             .then(user => loginUserSuccess(dispatch, user))
        //             .catch(() => loginUserFailed(dispatch));
        //     });

        axios.post('https://nutrics.herokuapp.com/api/auth/login', {
            email: email,
            password: password
        }).then(function (response) {
            console.log(response);
            loginUserSuccess(dispatch, response);
        }).catch(function (error) {
            loginUserFailed(dispatch, error)
            console.log(error);
        });
    }

};

const loginUserFailed = (dispatch,error) => {
    dispatch({
        type: LOGIN_USER_FAILED,
        payload: error
    });
    console.log('Login Failed error');
}
const loginUserSuccess = (dispatch, response) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response
    });
    // alert('Login success');
    _storeUserData(response);

}
_storeUserData = async (response) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(response));
        console.log('saving dat Success')
        retrieveData()
        Actions.auth();
    } catch (error) {
       
        console.log('Er'+error)
    }
}


// retrieveData = async () => {
//     console.log("called retrieve")
//     try {
//         console.log("try")
//         const value = await AsyncStorage.getItem('userData');
//         if (value !== null) {
//             // We have data!!
//             console.log("value")
//             console.log(value);
           
//         } else {
//             console.log("nulll value")
//         }
//     } catch (error) {
//         // Error retrieving data
//         console.log('Error retrieving data ' + error)
//     }
// }
