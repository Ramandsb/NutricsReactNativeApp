import { EMAIL_CHANGED } from "../actions/types";
import { PASSWORD_CHANGED } from "../actions/types";
import { LOGIN_USER_SUCCESS } from "../actions/types";
import { LOGIN_USER_FAILED } from "../actions/types";
import { LOGIN_USER } from "../actions/types";




const INITIAL_STATE = { email: '', password: '', user: null, error: '', loading: false };

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload,error:'' };

        //the above line says take all the data from state and update 
        //everything with action.payload in this case its email:

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload, error: ''};

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: '',
                loading: false,
                email: '',
                password: ''
            };

        case LOGIN_USER_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case LOGIN_USER:
            return {
                ...state,
                loading: true,
                error: ''
            };

        default:
            return state;
    }
}