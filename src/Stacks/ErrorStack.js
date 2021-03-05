import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Pageerror from '../Screen/Pageerror';

const Screens = createStackNavigator(
    {
        Pageerror: {
            screen: Pageerror,
            navigationOptions: {
              header: null
            }
        },
    },
    {
        initialRouteName: 'Pageerror',
    }
)

const ErrorStack = createAppContainer(Screens);

export default ErrorStack
