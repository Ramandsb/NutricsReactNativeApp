import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './Components/screens/Login'
import Signup from './Components/screens/Signup';
import ForgotPassword from './Components/screens/ForgotPassword';
import Account from './Components/screens/Account';
import Goals from './Components/screens/Goals';
import FoodPreffs from './Components/screens/FoodPreffs';
import SplashScreen from './Components/screens/SplashScreen';
import HomePage from './Components/screens/HomePage';
import colors from './styles/colors';
import SaveMacros from './Components/screens/SaveMacros';

const RouterComponent = () => {
    return (
        <Router >
        
            <Scene key='root' tintColor={colors.primaryColor} hideNavBar panHandlers={null} >
                <Scene key='mainpage' init hideNavBar tintColor={colors.primaryColor} component={HomePage} />

                <Scene key='splashscreen'  component={SplashScreen} />
                    <Scene key='unAuth' tintColor={colors.primaryColor} >
                        <Scene key='login' hideNavBar component={Login} title='Login'  />
                        <Scene key='signup' component={Signup} navTransparent />
                        <Scene key='forgotpassword' component={ForgotPassword} navTransparent />
                    </Scene>
                    <Scene key='auth' tintColor={colors.primaryColor} hideNavBar panHandlers={null}>
                            <Scene key='profile'  tintColor={colors.primaryColor} navTransparent>
                            <Scene key='proGoals' component={Goals} />
                            <Scene key='proAccount'  component={Account} navTransparent  />
                            <Scene key='proFoodpreffs' component={FoodPreffs} navTransparent />
                             <Scene key='saveMacros'  component={SaveMacros} navTransparent />
                        </Scene>

                    </Scene>
                
            </Scene>              
        </Router>
    );
};

// navigationBarStyle
// navTransparent makes transparent
// navigationBarStyle = {{ backgroundColor: '#fff' }}

export default RouterComponent;

