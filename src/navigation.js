import React from 'react';
import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import AuthStack from './Stacks/AuthStack';
import InicioStack from './Stacks/InicioStack';
import AuthLoadingScreen from './Screen/AuthLoadingScreen'
import FailedPermission from './Screen/FailedPermission'
import ErrorStack from './Stacks/ErrorStack';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: {
        screen: AuthLoadingScreen,
      },
      AuthLoading: {
        screen: AuthLoadingScreen,
      },
      FailedPermission: {
        screen: FailedPermission,
        navigationOptions:{
            header: null
        }
      },
      Inicio: InicioStack,
      Auth: AuthStack,
      ErrorStack: ErrorStack
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);