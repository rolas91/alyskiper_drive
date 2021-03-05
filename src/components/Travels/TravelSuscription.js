import React, {useState, useEffect} from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { GetTravel } from '../../graphql/suscription/GetTravel'
import { useSelector, useDispatch } from 'react-redux'
import { ADDITEMTONEWTRAVEL, EDITITEMTRAVEL } from '../../Reducer/ActionTypes'
import { Animated, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { withNavigation } from 'react-navigation'
import Texto from '../Texto'
import Theme from '../../utils/Style/Theme'
import { localNotification } from '../../utils/PushNotificacion'
import { ENCURSO, CONFIRMADO, ENPROCESO, FINALIZADO, SOLICITADO, ESPERANDOCONFIRMACION } from '../../utils/Modulo'

const TravelSuscription = (props) => {

    const usuario = useSelector(x => x.Usuario)
    const newtravels = useSelector(x => x.NewTravels)
    const dispatch = useDispatch()
    const [SpringValue] = useState(new Animated.Value(0.8))

    const { loading } = useSubscription(
        GetTravel,
        { variables: {
            idusuario: usuario.vehicle.skiperVehicleAgent[0].skiperAgent.id 
        },
        onSubscriptionData : ({ subscriptionData }) => {
            const skipertravel = subscriptionData.data.skiperTravel;
            switch (skipertravel.skiperTravelsTracing[0].travelstatus.codigo) {
                case SOLICITADO: {
                    spring()
                    dispatch({ type: ADDITEMTONEWTRAVEL, payload: skipertravel })
                    localNotification("Alyskiper", "Nuevo viaje", "", "Tienes una nueva solcitud de viaje")
                    break;
                }
                case ENCURSO:
                case CONFIRMADO:
                case ENPROCESO: 
                case ESPERANDOCONFIRMACION:
                case FINALIZADO: {
                    dispatch({ type: EDITITEMTRAVEL, payload: skipertravel })
                    break;
                }
            }
        }}
    );

    const spring = () => {  
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
        
    return (
        <TouchableOpacity style = {{
            width: wp("100%")
        }} onPress={() => { 
            if(!newtravels)
                alert("No tienes Viajes")
            else
                props.navigation.navigate("Viaje", { infoviaje: newtravels[newtravels.length] })
        }}>
            {!newtravels ? (
                <Texto padding = { 5 } alignSelf = { "center" } marginVertical = { 0 }
                marginHorizontal = { 0 } fontSize = { Theme.SIZES.title } 
                color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                text = { " No tienes viajes " } textAlign = "center"  />
            ) :  (
                (function(newTravels) {
                    switch (newTravels.skiperTravelsTracing[0].travelstatus.codigo) {
                        case SOLICITADO: {
                            return(
                                <Animated.Image
                                style={{   
                                    height: hp("50%"),
                                    width: wp("50%"),
                                    transform: [{scale: SpringValue}],
                                    opacity: props.opacidad,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft:"25%"
                                }}
                                source = {require('../../../assets/img/ImagenesGenerales/Canguro_vector.png')}  
                                resizeMode="contain"/>
                            )
                        }
                        case ENCURSO:
                        case ESPERANDOCONFIRMACION:
                        case CONFIRMADO:
                        case ENPROCESO: 
                        case FINALIZADO: {
                            return(
                                <Texto padding = { 5 } alignSelf = { "center" } marginVertical = { 0 }
                                marginHorizontal = { 0 } fontSize = { Theme.SIZES.title } 
                                color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                                text = { "Tienes un viaje activo toca para ingresar" } textAlign = "center"  />
                            )
                        }
                    }
                })(newtravels)
            )}
        </TouchableOpacity>
    )

}

export default withNavigation(TravelSuscription)