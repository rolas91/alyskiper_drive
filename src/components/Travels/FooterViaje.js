import React, { useState, useEffect } from 'react'
import { View, NativeModules, TouchableWithoutFeedback, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PubNubReact from "pubnub-react"
import InfoViaje from './InfoViaje'
import { useSelector } from 'react-redux'
import { ModificarViaje } from '../../graphql/mutations/ModificarViaje'
import { useMutation } from '@apollo/react-hooks'
import { WatchPosition } from '../WatchPosition'
import { PubNubPublishKey, PubNubSubscribeKey, KEYMAPBOX, SOLICITADO, ENPROCESO, ENCURSO, ESPERANDOCONFIRMACION, FINALIZADO, CONFIRMADO } from '../../utils/Modulo'
import IconM  from 'react-native-vector-icons/MaterialIcons'
import Theme from '../../utils/Style/Theme'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextoWithMatura from '../TextoWithMatura'

const FooterViaje = (props) => {

    const { errorRegion } = WatchPosition()
    const [registerTravelsTracing, { loading, error }] = useMutation(ModificarViaje)
    const usuario = useSelector(x => x.Usuario)
    const newTravels = useSelector(x => x.NewTravels)
    const position = useSelector(x => x.Position)
    const [showinfoviaje, setshowinfoviaje] = useState(false)
    const [pressStatus, setpressStatus] = useState(false)
    const [pubnub] = useState(new PubNubReact({
        publishKey: PubNubPublishKey,
        subscribeKey: PubNubSubscribeKey,
        ssl: false,
        uuid: usuario.firstname + "_" + usuario.lastname,
        subscribeRequestTimeout: 60000,
        presenceTimeout: 122
    }))

    if(errorRegion)
        props.navigation.navigate("Pageerror", {
            error: errorRegion.message
        })
    
    useEffect(()=> {
        if(error)
            props.navigation.navigate("Pageerror", {
                error: error.graphQLErrors[0].message
            })
    }, [error])

    const ActualizarViaje = async () => {
        setpressStatus(false)
        switch (newTravels.skiperTravelsTracing[0].travelstatus.codigo) {
            case SOLICITADO: {
                const result = await registerTravelsTracing( { variables: { 
                    idtravel: newTravels.id, 
                    idtravelstatus: ENCURSO,
                    lat: position.latitude,
                    lng: position.longitude
                }})
                const { data } = result;
                if(data){
                    NativeModules.ActivityStarter.OpenNavigationMapBox(
                        position.longitude, 
                        position.latitude, 
                        newTravels.lat_initial, 
                        newTravels.lng_initial, 
                        'Vamos a traer a ' + newTravels.users.firstname + " " + newTravels.users.lastname,
                        newTravels.id,
                        usuario.vehicle.skiperCatTravel.mode_drive,
                        KEYMAPBOX,
                        usuario.firstname + "_" + usuario.lastname,
                        newTravels.skiperTravelsTracing[0].travelstatus.id
                    )
                    pubnub.subscribe({
                        channels: [
                            "Driver_" + newTravels.id 
                        ],
                        withPresence: true
                    })
                }
                break;
            }
            case CONFIRMADO: { 
                const result = await registerTravelsTracing( { variables: { 
                    idtravel: newTravels.id, 
                    idtravelstatus: ENPROCESO,
                    lat: position.latitude,
                    lng: position.longitude
                }})
                const { data } = result;
                if(data)
                    NativeModules.ActivityStarter.OpenNavigationMapBox(
                        position.longitude, 
                        position.latitude, 
                        newTravels.lat_initial, 
                        newTravels.lng_initial, 
                        'Vamos a traer a ' + newTravels.users.firstname + " " + newTravels.users.lastname,
                        newTravels.id,
                        usuario.vehicle.skiperCatTravel.mode_drive,
                        KEYMAPBOX,
                        usuario.firstname + "_" + usuario.lastname,
                        newTravels.skiperTravelsTracing[0].travelstatus.id
                    )
                break;
            }
            case ENPROCESO: {
                if(props.distancia <= 10)
                {
                    const result = await registerTravelsTracing( { variables: { 
                        idtravel: newTravels.id, 
                        idtravelstatus: FINALIZADO,
                        lat: position.latitude,
                        lng: position.longitude
                    }})
                    const { data } = result;
                    if(data)
                        props.navigation.navigate("ViajeFinalizado")
                }
                else
                    NativeModules.ActivityStarter.OpenNavigationMapBox(
                        position.longitude, 
                        position.latitude, 
                        newTravels.lat_final, 
                        newTravels.lng_final, 
                        'Trasladando a ' + newTravels.users.firstname + " " + newTravels.users.lastname,
                        newTravels.id,
                        usuario.vehicle.skiperCatTravel.mode_drive,
                        KEYMAPBOX,
                        usuario.firstname + "_" + usuario.lastname,
                        newTravels.skiperTravelsTracing[0].travelstatus.id
                    )
                break;
            }
            case ENCURSO:
            case ESPERANDOCONFIRMACION: { 
                NativeModules.ActivityStarter.OpenNavigationMapBox(
                    position.longitude, 
                    position.latitude, 
                    newTravels.lat_initial, 
                    newTravels.lng_initial, 
                    'Vamos a traer a ' + newTravels.users.firstname + " " + newTravels.users.lastname,
                    newTravels.id,
                    usuario.vehicle.skiperCatTravel.mode_drive,
                    KEYMAPBOX,
                    usuario.firstname + "_" + usuario.lastname,
                    newTravels.skiperTravelsTracing[0].travelstatus.id
                )
                break;
            }
            case FINALIZADO: { 
                props.navigation.navigate("ViajeFinalizado")
                break;
            }
        }
    }

    return(
        <View style={{
            position: "absolute", 
            bottom: hp("1%"), 
            left:0,
            width: "100%",
            height: 50,
            flexDirection: "row",
            opacity: .8
        }}>
            {showinfoviaje ? <InfoViaje/> : null }
            <View style = {{
                width: "90%"
            }}>
            <TouchableWithoutFeedback
                onPressIn={() => { setpressStatus(true) }}
                onPressOut={ () => ActualizarViaje() }
                style={{ justifyContent: "flex-end" }}>
                <LinearGradient 
                colors = { pressStatus ? ['rgba(28,117,227,0.98)', '#000024'] : ['#000024', 'rgba(28,117,227,0.98)'] } 
                start={ { x: 0, y: 0.5 } } 
                end={ { x: 0, y: 0 } } 
                style={ style.linearGradient }>
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        height: "100%"
                    }}>
                        {function(newTravels) {
                            switch (newTravels.skiperTravelsTracing[0].travelstatus.codigo) {
                                case SOLICITADO:
                                case CONFIRMADO: {
                                    return(
                                        <TextoWithMatura padding={10} alignSelf={"center"} marginVertical={0}
                                        marginHorizontal={0} fontSize={Theme.SIZES.normal}
                                        color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                                        text={"Iniciar viaje" } />
                                    )
                                }
                                case ENCURSO:
                                case ESPERANDOCONFIRMACION:
                                {
                                    return(
                                        <TextoWithMatura padding={10} alignSelf={"center"} marginVertical={0}
                                        marginHorizontal={0} fontSize={Theme.SIZES.normal}
                                        color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                                        text={"Reanudar viaje" } />
                                    )
                                }
                                case ENPROCESO : {
                                    return(
                                        props.distancia > 10 
                                            ?
                                                <TextoWithMatura padding={10} alignSelf={"center"} marginVertical={0}
                                                marginHorizontal={0} fontSize={Theme.SIZES.normal}
                                                color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                                                text={"Reanudar viaje" } />
                                            :   
                                                <TextoWithMatura padding={10} alignSelf={"center"} marginVertical={0}
                                                marginHorizontal={0} fontSize={Theme.SIZES.normal}
                                                color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                                                text={"Completar viaje" } />

                                    )
                                }
                                case FINALIZADO: {
                                    return(
                                        <TextoWithMatura padding={10} alignSelf={"center"} marginVertical={0}
                                        marginHorizontal={0} fontSize={Theme.SIZES.normal}
                                        color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                                        text={"Realizar cobro" } />
                                    )
                                }
                            }
                        }(newTravels)}
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
            </View>
            <View style = {{
            width: "10%", height: "100%"
            }}>
            <LinearGradient 
            colors = { pressStatus ? ['rgba(28,117,227,0.98)', '#000024'] : ['#000024', 'rgba(28,117,227,0.98)'] } 
            start={ { x: 0, y: 0.5 } } 
            end={ { x: 0, y: 0 } } style = {{
                alignItems: "center", justifyContent:"center", height: "100%"
            }}>
                <TouchableOpacity activeOpacity = { 0.6 } style = {{
                padding: 2, height: "100%", alignItems: "center", justifyContent:"center"
                }} onPress = {() => { setshowinfoviaje(!showinfoviaje) }}>
                <IconM name ="info" size = { 25 } color = { Theme.COLORS.colorSecondary }/>
                </TouchableOpacity>
            </LinearGradient>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    linearGradient: {
      height: "100%",
      paddingLeft: 15,
      paddingRight: 15,
      width: '100%'
    },
  })

export default FooterViaje