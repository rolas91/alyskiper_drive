import React, { useState, useEffect } from 'react'
import { View, ImageBackground} from 'react-native'
import Theme from '../utils/Style/Theme'
import Texto from '../components/Texto'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { WatchPosition } from '../components/WatchPosition'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CalcularTarifa } from '../graphql/query/CalcularTarifa'
import TextoDosColumna from '../components/TextoDosColumna'
import Button from '../components/Button'
import { ModificarViaje } from '../graphql/mutations/ModificarViaje'
import { DELETEITEMTRAVEL } from '../Reducer/ActionTypes'
import { PubNubPublishKey, PubNubSubscribeKey, COBRADO } from '../utils/Modulo'
import PubNubReact from "pubnub-react"
import { localNotification } from '../utils/PushNotificacion'

const ViajeFinalizado = (props) => {

    const { errorRegion } = WatchPosition()
    const usuario = useSelector(x => x.Usuario)
    const newTravels = useSelector(x => x.NewTravels)
    const position = useSelector(x => x.Position)
    const [priceTotal, setPriceTotal] = useState(0)
    const [registerTravelsTracing] = useMutation(ModificarViaje)
    const dispatch = useDispatch()
    const [bConfirmarPago, setbConfirmarPago] = useState(false)
    const [pubnub] = useState(new PubNubReact({
        publishKey: PubNubPublishKey,
        subscribeKey: PubNubSubscribeKey,
        ssl: false,
        uuid: usuario.firstname + "_" + usuario.lastname,
        subscribeRequestTimeout: 60000,
        presenceTimeout: 122
    }))

    const { data, loading, error } = useQuery(CalcularTarifa, {
        variables: {
          idcountry: usuario.country.id,
          idcity: usuario.city.id,
          idcategoriaviaje: usuario.vehicle.skiperCatTravel.id,
          date_init: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm:ss')}`
        },
        onError: (error) => {
            props.navigation.navigate("Pageerror", {
                error: error.graphQLErrors[0].message
            })
        }
    })

    if(errorRegion)
        props.navigation.navigate("Pageerror", {
            error: errorRegion.message
        })

    useEffect(() => {
        const calculate = () => {
          if (data) {
    
            const { pricebase, priceminute, priceckilometer, priceminimun } = data.CalcularTarifa
            const minutes = newTravels.duration * priceminute
            const km = newTravels.distance * priceckilometer
    
            const total = minutes + km + pricebase
            if (total < priceminimun) {
              setPriceTotal(priceminimun)
            } else {
              setPriceTotal(total)
            }
          }
        }
        calculate()            
    }, [data, error])

    return(
        <>
            {data && newTravels ? (
                <ImageBackground 
                style={{   
                    width: wp("100%"),
                    height: hp("100%"),
                    backgroundColor: Theme.COLORS.colorMainDark,
                }} source= {require('../../assets/img/ImagenesGenerales/fondo3.png')}> 
                    <View style={{
                        paddingHorizontal: 20,
                        backgroundColor: "rgba(0,0,0,.5)",
                        width: wp("100%"),
                        height: hp("100%"),
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                        <Texto padding = { 15 } alignSelf = { "center" } marginVertical = { 0 }
                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.title } 
                        color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                        text = { "Resumen del viaje" } />

                        <TextoDosColumna textfirtscolumn = { "Precio base"} 
                        textsecondcolumn = { data.CalcularTarifa.pricebase }/>

                        <TextoDosColumna textfirtscolumn = { newTravels.duration + " min" } 
                        textsecondcolumn = { data.CalcularTarifa.priceminute * newTravels.duration }/>

                        <TextoDosColumna textfirtscolumn = { newTravels.distance + " km" } 
                        textsecondcolumn = { data.CalcularTarifa.priceckilometer * newTravels.distance }/>

                        <TextoDosColumna textfirtscolumn = { "Total" } 
                        textsecondcolumn = { priceTotal }/>

                        <Button isloading = { bConfirmarPago } opacidad = { 1 } bicon = { false } 
                        text = 'CONFIRMAR' bborder = { true }  borderWidth = { 1 } 
                        borderColor = { Theme.COLORS.colorSecondary }
                        height = { hp("7%") } width = { wp("80%") }
                        colorfondo ={ Theme.COLORS.colorMainDark }
                        marginTop = {10} marginBottom = {0} marginLeft = {3} marginRight = {3}
                        padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                        fontSize = { Theme.SIZES.small }
                        onPress = {()=> {
                            setbConfirmarPago(true)
                            registerTravelsTracing( { variables: { 
                                idtravel: newTravels.id, 
                                idtravelstatus: COBRADO,
                                lat: position.latitude,
                                lng: position.longitude
                            }}).then((result) => {
                                setbConfirmarPago(false)
                                props.navigation.navigate("Home")
                                localNotification("Alyskiper", "Nuevo viaje", "", "EL viaje ha terminado")
                                pubnub.unsubscribe({ channels: ["Driver_" + newTravels.id]})
                                dispatch({ type: DELETEITEMTRAVEL })
                            }).catch((error) => {
                                setbConfirmarPago(false)
                                props.navigation.navigate("Pageerror", {
                                    error: error.graphQLErrors[0].message
                                })
                            }) 
                        }}/>

                    </View>
                </ImageBackground>
            ) : null }
        </>
    )
}

export default ViajeFinalizado