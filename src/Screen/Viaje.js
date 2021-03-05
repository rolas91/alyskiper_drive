import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { View } from 'react-native-animatable'
import Theme from '../utils/Style/Theme'
import Texto from '../components/Texto'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { ModificarViaje } from '../graphql/mutations/ModificarViaje'
import { useMutation } from '@apollo/react-hooks'
import IconMC  from 'react-native-vector-icons/MaterialCommunityIcons'
import IconM  from 'react-native-vector-icons/MaterialIcons'
import geolib from 'geolib'
import { PubNubPublishKey, PubNubSubscribeKey, RECHAZADO, ESPERANDOCONFIRMACION, ENCURSO, GetDistance } from '../utils/Modulo'
import { WatchPosition } from '../components/WatchPosition'
import { DELETEITEMTRAVEL } from '../Reducer/ActionTypes'
import ModalConfirm from '../components/ModalConfirm'
import PubNubReact from "pubnub-react"
import Mapa from '../components/Travels/Mapa'
import FooterViaje from '../components/Travels/FooterViaje'

const Viaje = (props) => {

  const { errorRegion } = WatchPosition()
  const usuario = useSelector(x => x.Usuario)
  const newTravels = useSelector(x => x.NewTravels)
  const position = useSelector(x => x.Position)
  const [distancia, setdistancia] = useState(1000000)
  const [brechazar, setbrechazar] = useState(false)
  const [registerTravelsTracing, { loading, error }] = useMutation(ModificarViaje)
  const dispatch = useDispatch()
  const [pubnub] = useState(new PubNubReact({
    publishKey: PubNubPublishKey,
    subscribeKey: PubNubSubscribeKey,
    ssl: false,
    uuid: usuario.firstname + "_" + usuario.lastname,
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122
  }))

  useEffect(() => {

    const GetDistancia = async (latdest, longdist) => {
      await GetDistance(
        { latitude: position.latitude, longitude: position.longitude },
        { latitude: latdest, longitude: longdist },
        usuario.vehicle.skiperCatTravel.mode_drive
      ).then(result => {
        setdistancia(result.routes[0].legs[0].distance.value)
      })
    }

    if(newTravels && position)
    {
      switch (newTravels.skiperTravelsTracing[0].travelstatus.codigo) {
        case ENCURSO:
        case ESPERANDOCONFIRMACION: {
          GetDistancia(newTravels.lat_initial, newTravels.lng_initial)
          break;
        }
        default: {
          GetDistancia(newTravels.lat_final, newTravels.lng_final)
          break;
        }
      }

      switch (newTravels.skiperTravelsTracing[0].travelstatus.codigo) {
        case ENCURSO: {
          if(distancia <= 10 && !loading)
          {
            registerTravelsTracing({variables: { 
              idtravel: newTravels.id, 
              idtravelstatus: ESPERANDOCONFIRMACION,
              lat: position.latitude,
              lng: position.longitude
            }})
          }
          break;
        }
      }
      
    }

    if(error)
      props.navigation.navigate("Pageerror", {
        error: error.graphQLErrors[0].message
      })
  }, [position, newTravels, setdistancia, distancia, error, loading])

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  if(errorRegion)
    props.navigation.navigate("Pageerror", {
      error: errorRegion.message
    })

  if(brechazar)
    return(
      <View style = {{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.COLORS.colorMainDark,
        opacity: .9
      }}>
        <ModalConfirm text = "Esta seguro de rechazar el viaje" 
        onPressConfirm = {async () => { 
          const result = await registerTravelsTracing({variables: { 
              idtravel: newTravels.id, 
              idtravelstatus: RECHAZADO,
              lat: position.latitude,
              lng: position.longitude
            } 
          })
          const { data } = result;
          if(data)
          {
            dispatch({ type: DELETEITEMTRAVEL })
            props.navigation.navigate("Home")
            pubnub.unsubscribe({ channels: ["Driver_" + newTravels.id]})
          }
        }} 
        onPressCancel = {() => { setbrechazar(false) }}/>
      </View>
    ) 
  
  return (
    <>
      {newTravels && position ? (
        <>
          <View style={{
            backgroundColor: Theme.COLORS.colorMainDark,
            width: wp("100%")
          }}>
            <Mapa distancia = { distancia }/>
            <View style = {{
              position: "absolute",
              height: 50,
              width: 200,
              bottom: 60,
              backgroundColor: 'rgba(0,0,0,.5)'
            }}>
              <Texto padding={10} alignSelf={"center"} marginVertical={0}
              marginHorizontal={0} fontSize={Theme.SIZES.normal}
              color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
              text={ distancia + " metros" } />
            </View>
            <View style = {{
              flexDirection: "row", paddingVertical: 5,
              position: "absolute", top: 1, height: hp("10%"),
              width: wp("100%"), backgroundColor: Theme.COLORS.colorMain,
              opacity: .8, justifyContent: "space-between"
            }}>
              { newTravels.skiperTravelsTracing[0].travelstatus.id == 1 ? (
                <View style = {{
                  alignItems: "center", justifyContent: "center", paddingHorizontal: 2
                }}>
                  <TouchableOpacity onPress = {() => { setbrechazar(true) }}>
                    <IconM name = "clear" size = { 25 } color = { Theme.COLORS.colorError }/>
                  </TouchableOpacity>
                </View>
              ) : null }
              <View style = {{
                alignItems: "center", justifyContent: "center"
              }}>
                <Texto padding={10} alignSelf={"center"} marginVertical={0}
                marginHorizontal={0} fontSize={Theme.SIZES.normal}
                color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                text={"Nueva solicitud de viaje " } />
              </View>
              <View style = {{
                alignItems: "center", justifyContent: "center",                   
                paddingHorizontal: 2
              }}>
                <TouchableOpacity activeOpacity = {0.6} style = {{
                  backgroundColor: Theme.COLORS.colorMainDark,
                }} onPress = {() => { props.navigation.navigate("CodigoViaje") }}>
                  <IconMC name ="qrcode-scan" size = { 25 } color = {Theme.COLORS.colorSecondary}/>
                </TouchableOpacity>
              </View>
            </View>
            <FooterViaje navigation = { props.navigation } distancia = { distancia }/>
          </View>
        </>
      ) : null }
    </>
  )
}

export default Viaje