import React, { useState, useEffect } from 'react'
import {StatusBar, PermissionsAndroid,View, ActivityIndicator, Image,Dimensions } from 'react-native'
import Theme from '../utils/Style/Theme'
import Texto from '../components/Texto'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Button from '../components/Button'
import * as Animatable from 'react-native-animatable'
import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service'

var {height, width} = Dimensions.get('window');

const FailedPermission = (props) => {

    const [internetStatus, setinternetStatus] = useState(null)
    const [gpsStatus, setGPSStatus] = useState(null)
    
    async function CheckPermiso(){
        try {
             const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
               {
                'title': 'Acceso a localizacion',
                'message': 'La aplicacion necesita acceso al GPS  ' +
                'para que puedas recibir solicitudes de viajes.'
               }
             )
    
    
             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                (position) => {
                    const p = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }
                   
                    setGPSStatus( true)
                },
                (error) => {
                    console.log(error.code, error.message);
                    
             setGPSStatus( false)
                    if(error.code===5){
                     
                        
                    }
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
           
         // watchLocation()
  

             } else {
    
            //  setState({permissionGPS:granted})
    
            setGPSStatus(false     )
             }
           } catch (err) {
             console.warn(err)
            
             setGPSStatus( false)
           }
    
        }

    
    useEffect(() => {  

        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setinternetStatus(state)
          });

          CheckPermiso()
        
    
    }, [internetStatus])



if(internetStatus!==null && gpsStatus!==null){
    console.log("Level1")
    console.log(internetStatus)
    console.log(gpsStatus)
    if(internetStatus.isConnected===true && gpsStatus===true){
        console.log("Level2")
    props.navigation.navigate("Inicio")
}
}

    return(
  
   <View style = { Theme.MainContainer, {
    flex:1,
    backgroundColor: Theme.COLORS.colorMainDark
}}>

{internetStatus!==null && gpsStatus!==null? (
    <View style = { Theme.MainContainer, {
        flex:1,
        backgroundColor: Theme.COLORS.colorMainDark
    }}>

<Texto  padding = { 10 } alignSelf = { "center" } marginVertical = { 0 }
            marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
            color = { Theme.COLORS.colorSecondary } fontFamily = { Theme.FONTS.LatoB }
            text = "Recursos Necesarios"  />

        <View  style = { Theme.MainContainer, {
            flex:0.5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Theme.COLORS.colorMainDark,
    marginTop:100
        }}>    


{internetStatus.isConnected===false ? (

<View    style = { Theme.MainContainer, {
        
            justifyContent: 'center',
            alignItems: 'center',
            
        }}>
<Texto  padding = { 10 } alignSelf = { "center" } marginVertical = { 0 }
            marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
            color = { Theme.COLORS.colorSecondary } fontFamily = { Theme.FONTS.LatoB }
            text = "Sin internet"  />
 <Icon   name='cloud-off' size={30} color="red"/>

<Button opacidad = {0.6} bicon = { false } text = 'Reintentar'
bborder = {true}  borderWidth = {5} borderColor = {Theme.COLORS.colorUnderline}

colorfondo ={ Theme.COLORS.colorMainDark } 

padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
fontSize = { Theme.SIZES.small }
onPress = {() => {
    NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setinternetStatus(state)
      });

}}/> 
</View>


): null



}

{gpsStatus===false ? (
<View    style = { Theme.MainContainer, {
        
        justifyContent: 'center',
        alignItems: 'center',
 
    }}>
 
    <Texto  padding = { 10 } alignSelf = { "center" } marginVertical = { 0 }
                marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                color = { Theme.COLORS.colorSecondary } fontFamily = { Theme.FONTS.LatoB }
                text = "Sin GPS"  />
    
    <Icon name='gps-off' size={30} color="red"/>

    <Button opacidad = {0.6} bicon = { false } text = 'Reintentar2'
bborder = {true}  borderWidth = {5} borderColor = {Theme.COLORS.colorUnderline}

colorfondo ={ Theme.COLORS.colorMainDark } 

padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
fontSize = { Theme.SIZES.small }
onPress = {() => {

    CheckPermiso()

}}/> 
    </View>
    
    
    ): null
    
    
    
    }

   </View>

</View>  
):      <View style = {{
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

}  
   </View> 
);
}

export default FailedPermission