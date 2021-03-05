import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Theme from '../utils/Style/Theme'
import PubNubReact from "pubnub-react"
import Texto from '../components/Texto'
import {
    Image,
    ImageBackground,
    Animated,
    Dimensions,
    StatusBar
} from 'react-native'
import TravelSuscription from '../components/Travels/TravelSuscription'
import { ADDITEMTONEWTRAVEL, CONECT, DISCONET } from '../Reducer/ActionTypes'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { WatchPosition } from '../components/WatchPosition'
import { GetTravel } from '../graphql/query/GetTravel'
import { PubNubPublishKey, PubNubSubscribeKey, ChanelSkiperDriver } from '../utils/Modulo';

var { height } = Dimensions.get("window")

const Home = (props) => {

    const { errorRegion } = WatchPosition()
    const [opacidad] = useState(1)
    const usuario = useSelector(x => x.Usuario)
    const newtravels = useSelector(x => x.NewTravels)
    const driveonline = useSelector(x => x.DriveOnline)
    const position = useSelector(x => x.Position)
    const [SpringValue] = useState(new Animated.Value(0.8))
    const dispatch = useDispatch()
    const [pubnub] = useState(new PubNubReact({
        publishKey: PubNubPublishKey,
        subscribeKey: PubNubSubscribeKey,
        ssl: false,
        uuid: usuario.firstname + "_" + usuario.lastname,
        subscribeRequestTimeout: 60000,
        presenceTimeout: 122
    }))

    const { data, loading, error } = useQuery(GetTravel, {
        variables: { idagent: usuario ? usuario.vehicle.skiperVehicleAgent[0].skiperAgent.id : undefined },
        onCompleted : () => {
            if(data)
                dispatch({ type: ADDITEMTONEWTRAVEL, payload: data.getTravelByAgentId })  
        }
    })

    if(errorRegion)
        return null

    async function SetUpApp() {
        pubnub.addListener({
            status: function(statusEvent) {
                if("subscribedChannels" in statusEvent)
                {
                    if(statusEvent.subscribedChannels
                    .filter(item => item == ChanelSkiperDriver + "_" + usuario.vehicle.skiperCatTravel.id)
                    .length > 0)
                        dispatch({ type: CONECT, payload: true })
                }  
            },
            presence: function(presenceEvent) {
                console.log(presenceEvent)
            }
        })

        if(!driveonline)
            pubnub.subscribe({
                channels: [
                    ChanelSkiperDriver + "_" + usuario.vehicle.skiperCatTravel.id, 
                ],
                withPresence: true
            })
    }
   
    const spring = () => {  
        if(driveonline === true ) {
            SpringValue.setValue(2);
            Animated.sequence([
                Animated.timing(SpringValue, {
                    toValue: 0.2,
                    duration: 500,
                    delay: 100
                }),
                Animated.timing(SpringValue, {
                toValue: 0.8,
                duration: 100
            })
            ]).start(event => {
                if (event.finished) {
                    spring()
                }
            });
        }
    }

    async function watchLocation(){

        const newCoordinate = {
            latitude: position.latitude,
            longitude: position.longitude
        };
       
        if(driveonline) {
            pubnub.setState({
                state: {
                    "categoria": usuario.vehicle.skiperCatTravel.id,
                    "SkiperAgentId": usuario.vehicle.skiperVehicleAgent[0].skiperAgent.id,
                    "coords": newCoordinate,
                    "firstname": usuario.firstname,
                    "lastname" :usuario.lastname
                },
                channels: [ChanelSkiperDriver + "_" + usuario.vehicle.skiperCatTravel.id],
            }).then((response) => {  
            }).catch((error) => { 
            });
        }

        //nos suscrubimos al id del viaje enc aso que haya viaje
        if(newtravels)
            pubnub.setState({
                state: {
                    "categoria": usuario.vehicle.skiperCatTravel.id,
                    "SkiperAgentId": usuario.vehicle.skiperVehicleAgent[0].skiperAgent.id,
                    "coords": newCoordinate,
                    "firstname": usuario.firstname,
                    "lastname" :usuario.lastname
                },
                channels: ["Driver_" + newtravels.id ],
            }).then((response) => { 
                console.log(response)
            }).catch((error) => { 
            });
    }

    useEffect(() => {
        SetUpApp()
    }, [])

    useEffect(() => {
        if(newtravels){
            pubnub.subscribe({
                channels: [
                    "Driver_" + newtravels.id 
                ],
                withPresence: true
            })
        }
        if(position)
            watchLocation()
    }, [newtravels, pubnub, position])

    return(
        <ImageBackground
        style={{ flex: 1, backgroundColor:Theme.COLORS.colorMainDark}}
        source={require('../../assets/img/ImagenesGenerales/img-background.png')}>
            <StatusBar barStyle="light-content" backgroundColor = { Theme.COLORS.colorMainDark } />
            <View style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,.6)",
                paddingTop: 50
            }}>


         
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image resizeMode="contain"
                        source={require('../../assets/img/ImagenesGenerales/Skip.png')}
                        style={{
                            height: height * 0.3,
                            width: height * 0.9,
                        }} />
                </View>
                <View style={{
                    flex:2,
                    justifyContent: 'center',
                    alignItems: 'center',
                   
                }}>
                    { driveonline ? (
                        <TravelSuscription opacidad = { opacidad }/>
                    ): (

                        <Texto padding={10} alignSelf={"center"} marginVertical={0}
                        marginHorizontal={0} fontSize={Theme.SIZES.subTitle}
                        color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                        text="Tienes que estar disponible para empezar a recibir viajes" />
                    )    
                    }
                </View>
                <View style={{
                    flex: 0,
                    marginRight: 40,
                    alignItems: 'flex-end',
                    marginBottom: 30
                }}>
                    <TouchableOpacity onPress={() => {
                        if (driveonline)
                        {
                            if(newtravels)
                            {
                                alert("No puedes desactivarte porque tienes un viaje en curso")
                                return
                            }
                            pubnub.unsubscribe({ channels: [ChanelSkiperDriver + "_" + usuario.vehicle.skiperCatTravel.id] })
                            dispatch({ type: DISCONET })
                            SpringValue.setValue(0.6)
                        }
                        else
                        {
                            pubnub.subscribe({
                                channels: [ChanelSkiperDriver + "_" + usuario.vehicle.skiperCatTravel.id],
                                withPresence: true
                            });
                            dispatch({ type: CONECT, payload: true })  
                        }
                    }}
                        style={{
                            shadowColor: 'rgba(0,0,0, .4)', // IOS
                            shadowOffset: { height: 50, width: 50 }, // IOS
                            shadowOpacity: 1, // IOS
                            shadowRadius: 20, //IOS
                            backgroundColor: Theme.COLORS.colorSecondary,
                            elevation: 100, // Android
                            height: 60,
                            width: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            borderRadius: 50,
                        }}>
                        {driveonline ?
                            <Image
                            source={require('../../assets/img/ImagenesGenerales/Skiper_Online.png')}
                            style={{
                                height: height * 0.1,
                                width: height * 0.1
                            }} />
                            :
                            <Image resizeMode="cover" source={require('../../assets/img/ImagenesGenerales/Skiper_Offline.png')}
                            style={{
                                height: height * 0.1,
                                width: height * 0.1,
                            }} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
           
            
       </ImageBackground>
    )
}
export default Home