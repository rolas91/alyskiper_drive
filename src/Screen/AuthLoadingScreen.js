import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Dimensions,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Theme from '../utils/Style/Theme';
var jwtDecode = require('jwt-decode');
var moment = require('moment')
import { useDispatch } from 'react-redux'
import { lOGOUT, SINGIN } from '../Reducer/ActionTypes';

var {height, width} = Dimensions.get('window');

const AuthLoadingScreen =(props) => {
  
  const dispatch = useDispatch()

  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('skiperStorage');
    if(!userToken)
    {
      props.navigation.navigate('Auth');
      return
    }
    else{
      var y = jwtDecode(JSON.parse(userToken).token)
      if(y.exp < moment.unix())
      {
        await AsyncStorage.removeItem('skiperStorage')
        dispatch({ type: lOGOUT })
        props.navigation.navigate('Auth')
        return
      }
      else {
        payload = await AsyncStorage.getItem('skiperStorage')
        dispatch({ type: SINGIN, payload: JSON.parse( payload ) })
        props.navigation.navigate('Home');
        return
      }
      
    }
    // setTimeout(()=> {
    //     // This will switch to the App screen or Auth screen and this loading
    //     // screen will be unmounted and thrown away.
    //     this.props.navigation.navigate(userToken ? 'Inicio' : 'Auth');
    // }, 1000)
  }

  useEffect(() => { _bootstrapAsync() })

  // Render any loading content that you like here
  // render() {
    return (
      <View style = {{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: Theme.COLORS.colorMain
      }} >
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image 
            source= {require('../../assets/img/ImagenesGenerales/logotext.png')} 
            style={{
                height: height * 0.3, width: width * 0.9
            }} resizeMode = "contain"/>
        </View>
        <ActivityIndicator size="large" color={ Theme.COLORS.colorSecondary } />
        <StatusBar  barStyle="light-content" backgroundColor = '#000018' />
      </View>
    );
}

export default AuthLoadingScreen