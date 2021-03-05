import React from 'react';
import Login from '../Screen/Login'
import ResetPasswordScreen from '../Screen/ResetPasswordScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import VerifyCodeScreen from '../Screen/VerifyCodeScreen';
import ResetScreen from '../Screen/ResetScreen';

const Screens = createStackNavigator(
    {
        Login: {
            screen : Login,
            navigationOptions:{
            header: null
            }
        },
        ResetPasswordScreen: {
            screen : ResetPasswordScreen,
            navigationOptions:{
                header: null
            }
        },
        VerifyCodeScreen: {
            screen : VerifyCodeScreen,
            navigationOptions:{
                header: null
            }
        },
        ResetScreen: {
            screen : ResetScreen,
            navigationOptions:{
                header: null
            }
        }
    },
    {
        initialRouteName: 'Login',
    }
)

const AuthStack = createAppContainer(Screens);

export default AuthStack
