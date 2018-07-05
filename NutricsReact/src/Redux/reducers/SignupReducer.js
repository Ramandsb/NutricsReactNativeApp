import { SIGNUP_USER_UPDATE, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNUP_USER,
            PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILED ,PROFILE_UPDATE,
  } from "../actions/types";

const INITIAL_STATE = { 
     email : '', password : '', confirmPassword : '',
    goal : '', gender : '', age : '', weight : '',
     height : '', bodyFat : '', frameSize : '', 
     activityLevel : '', eatMeat : '', meatChoices : [],
    allergies: [], firstname: '', lastname: '',error:'',loading: false, response: null,
    userCalories: 0, userFats: 0, userCarbs: 0, userProtein: 0 };


export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case SIGNUP_USER_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SIGNUP_USER:
            return{
                ...state,
                loading:true,
                error:''
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                response: action.payload
            };
        case SIGNUP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case PROFILE_UPDATE:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                response: action.payload
            };
        case PROFILE_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};