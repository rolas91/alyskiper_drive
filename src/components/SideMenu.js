import React, { useEffect, useState } from 'react'
import {ScrollView, View, ActivityIndicator,ImageBackground} from 'react-native'
import SideMenuHeader from './SideMenuHeader'
import Theme from '../utils/Style/Theme'
import SideMenuItems from './SIdeMenuItems'
import AsyncStorage from '@react-native-community/async-storage'
import { Logout } from '../graphql/mutations/Logauth'
import { useMutation } from '@apollo/react-hooks'
import Texto from '../components/Texto';
import jwtdecode from 'jwt-decode'
import VersionInfo from 'react-native-version-info'
import { useSelector, useDispatch } from 'react-redux'
import { DISCONET, lOGOUT } from '../Reducer/ActionTypes'
import { ChanelSkiperDriver, PubNubPublishKey, PubNubSubscribeKey } from '../utils/Modulo'
import PubNubReact from "pubnub-react"


const SideMenu = (props) => {

  const [cerrarsesion, { loading , data, error  }] = useMutation(Logout)
  const newtravels = useSelector(x => x.NewTravels)
  const usuario = useSelector(x => x.Usuario)
  const dispatch = useDispatch()
  const [pubnub] = useState(new PubNubReact({
    publishKey: PubNubPublishKey,
    subscribeKey: PubNubSubscribeKey,
    ssl: false,
    uuid: usuario.firstname + "_" + usuario.lastname,
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122
}))

  async function dropskiperStorage(){
    props.navigation.navigate("Login")
    pubnub.unsubscribe({ channels: [ChanelSkiperDriver + "_" + usuario.vehicle.skiperCatTravel.id] })
    await AsyncStorage.removeItem('skiperStorage')
    dispatch({ type: DISCONET })
    dispatch({ type: lOGOUT })
  }

  useEffect(()=> {
    if(data) {
      dropskiperStorage()
    }
  }, [data])
  
  return (
    <>
    { loading ? (
   
      <ImageBackground 
      style={{ 
        flex:1,
        backgroundColor: Theme.COLORS.colorMainDark,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      source= {require('../../assets/img/ImagenesGenerales/Background.png')}> 
        <ActivityIndicator size="large" color={ Theme.COLORS.colorSecondary } />   
      </ImageBackground>
      
    ) : (
      <ImageBackground 
      style={{ 
        flex:1,
        backgroundColor: Theme.COLORS.colorMainDark
      }} source= {require('../../assets/img/ImagenesGenerales/Background.png')}> 
        <View style = { Theme.MainContainer, { height:"100%", width:"100%", flex: 1, backgroundColor: "rgba(0,0,0,.6)" } }>
          <SideMenuHeader name = { usuario.firstname } lastname = { usuario.lastname }
          avatar = { usuario.avatar }
          email = { usuario.email }/>
            <ScrollView>
              {/* se cometa esta opcion porque no tiene sentido */}
              {/* <SideMenuItems Texto = {"Inicio"}
              textcolor = { Theme.COLORS.colorParagraph }
              textsize = { Theme.SIZES.small }
              iconname = {"home"} iconcolor = { Theme.COLORS.colorSecondary }
              iconsize = {25}
              onPress = {() => {
                props.navigation.navigate("Home");
              }}/> */}
              {/* se comenta esta opcion porque esta en desarrollo */}
              {/* <SideMenuItems Texto = {"Historial de viajes"}
              textcolor = { Theme.COLORS.colorParagraph }
              textsize = { Theme.SIZES.small }
              iconname = {"history"} iconcolor = { Theme.COLORS.colorSecondary }
              iconsize = {25}
              onPress = {() => {
                  props.navigation.navigate("HistorialDeViaje");
              }}/> */}
              <SideMenuItems Texto = {"Wallets"}
              textcolor = { Theme.COLORS.colorParagraph }
              textsize = { Theme.SIZES.small }
              iconname = {"monetization-on"} iconcolor = { Theme.COLORS.colorSecondary }
              iconsize = { 25 }
              onPress = {() => {
                props.navigation.navigate("Wallets")
              }}/>
              <SideMenuItems Texto = {"Cerrar sesion"}
              textcolor = { Theme.COLORS.colorParagraph }
              textsize = { Theme.SIZES.small }
              iconname = {"reply-all"} iconcolor = { Theme.COLORS.colorSecondary }
              iconsize = { 25 }
              onPress = {()=> {
                if(newtravels)
                {
                    alert("No puedes cerrar sesion porque tienes un viaje en curso")
                    return
                }
                cerrarsesion( { variables: { id: jwtdecode(usuario.token).sub }} ) 
              }}/>
            </ScrollView>
            <View style = {{
              position: "absolute",
              bottom: 10,
              alignItems: "center",
              width: "100%",
              justifyContent: "center"
            }}>
              <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
              marginHorizontal = { 0 } fontSize = { Theme.SIZES.xsmall } 
              color = { Theme.COLORS.colorUnderline} fontFamily = { Theme.FONTS.LatoB }
              text = { "Version " + VersionInfo.appVersion}/>
            </View>
          </View>
      </ImageBackground> )}
    </>
  
  );
}

export default SideMenu;