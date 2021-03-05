import React, { useEffect, useState, useRef } from 'react'
import MapView from 'react-native-maps'
import { regionFrom, getRoutePoints, ESPERANDOCONFIRMACION, ENCURSO, CONFIRMADO, ENPROCESO, SOLICITADO } from '../../utils/Modulo'
import { useSelector } from 'react-redux'
import { StyleSheet, Image } from 'react-native'
import Theme from '../../utils/Style/Theme'
import { WatchPosition } from '../WatchPosition'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const Mapa = props => {

    const { errorRegion } = WatchPosition()
    const map = useRef(null)
    const usuario = useSelector(x => x.Usuario)
    const newTravels = useSelector(x => x.NewTravels)
    const position = useSelector(x => x.Position)
    const [coords, setcoords] = useState(null)

    if(errorRegion)
        props.navigation.navigate("Pageerror", {
            error: errorRegion.message
        })

    useEffect(() => {
        async function ShowPolyline () {
            const { skiperTravelsTracing } = newTravels
            console.log(skiperTravelsTracing)
            let routepoints = await getRoutePoints(
                {
                    latitude: skiperTravelsTracing[0].codigo == CONFIRMADO
                              || skiperTravelsTracing[0].codigo == ENCURSO 
                                ? position.latitude
                                : newTravels.lat_initial,
                    longitude: skiperTravelsTracing[0].codigo == CONFIRMADO
                               || skiperTravelsTracing[0].codigo == ENCURSO
                                ? position.longitude
                                : newTravels.lng_initial
                },
                {
                    latitude: newTravels.lat_final,  
                    longitude: newTravels.lng_final
                }, 
                usuario.vehicle.skiperCatTravel.mode_drive
            )
            setcoords(routepoints)
            map.current.fitToCoordinates(routepoints, {
                edgePadding: {
                    right: 100,
                    left: 100,
                    top: 300,
                    bottom: 300
                }
            })

        }
        ShowPolyline()
      }, [position, newTravels, usuario, setcoords])

    return(
        <MapView
        ref={ map }
        zoomEnabled={ true }
        style={{
            width: "100%",
            height: '100%',
        }}
        initialRegion = { regionFrom(position.latitude, position.longitude, props.distancia) } 
        onRegionChange={() => {}}>

            { coords ? (
                <MapView.Polyline
                coordinates={ coords }
                strokeWidth={ 3 }
                strokeColor={ Theme.COLORS.colorMain }/>
            ) : null }

            {
                function(newTravels, position){
                    switch (newTravels.skiperTravelsTracing[0].travelstatus.codigo) {
                        case CONFIRMADO:
                        case ENPROCESO: {
                            return(
                                <MapView.Marker
                                coordinate={{ 
                                    latitude: position.latitude,
                                    longitude: position.longitude
                                }}>
                                    <Image source={{ uri:usuario.vehicle.skiperCatTravel.url_img_drive }}
                                    style={style.MarkDest} />
                                </MapView.Marker>
                            )
                        }
                        default: {
                            return(
                                <MapView.Marker
                                coordinate={{ 
                                    latitude: newTravels.lat_initial,
                                    longitude: newTravels.lng_initial
                                }}>
                                    <Image source={require('../../../assets/img/Location_Skiper/Skipper_RedInicio.png')}
                                    style={style.MarkDest} />
                                </MapView.Marker>
                            )
                        }
                    }
                }(newTravels, position)
            }
        
            <MapView.Marker coordinate={{ latitude: newTravels.lat_final, longitude: newTravels.lng_final }}>
                <Image source={require('../../../assets/img/Location_Skiper/Skipper_GreenDest.png')}
                style={style.MarkDest} />
            </MapView.Marker>

            {
                function(newTravels, position){
                    switch (newTravels.skiperTravelsTracing[0].travelstatus.codigo) {
                        case SOLICITADO:
                        case ENCURSO:
                        case ESPERANDOCONFIRMACION: {
                            return (
                                <MapView.Marker
                                coordinate={{ latitude: position.latitude, longitude: position.longitude }}>
                                    <Image source={{ uri:usuario.vehicle.skiperCatTravel.url_img_drive }}
                                    style={ style.MarkDest } />
                                </MapView.Marker>
                            )
                        }
                        default: {
                            null
                        }
                    }
                }(newTravels, position)
            }
        </MapView>
    )
}

const style = StyleSheet.create({
    MarkDest: {
      width: 40,
      height: 40
    }
})

export default Mapa;