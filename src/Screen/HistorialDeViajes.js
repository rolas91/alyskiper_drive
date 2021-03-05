import React, { useState } from 'react'
import { View, BackHandler,TouchableOpacity, ScrollView,ImageBackground} from 'react-native'
import Theme from '../utils/Style/Theme'
import Texto from '../components/Texto'
import { HistoriaViajes } from '../DataTemporal/HistorialViajes'
import LabelHorizontal from '../components/LabelHorizontal'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import ModalViewViaje from '../components/ModalViewViaje'
import { GetTravelby as PQ } from '../graphql/query/GetTravelby'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
const HistorialDeViajes = (props) => {

    const [ModalVisible, setModalVisible] = useState(false)

    const cerrarmodal = () => {
        setModalVisible(false)
    }
 
    const usuario = useSelector(x => x.Usuario)
    const dispatch = useDispatch()
    const { loading, data, error } = useQuery(PQ,
    { variables: { idagent:usuario.vehicle.skiperVehicleAgent[0].skiperAgent.id }, onCompleted : () => {
        if(data){
          console.log(data)
        }
    }})

    const Viajes = data.getTravels.map(d => {

        if(data!==null)
        return(

            <View style = { Theme.MainContainer, {
                marginRight:40,
                marginLeft:40,
                marginTop:10,
                paddingTop:20,
                paddingBottom:20,
                backgroundColor:Theme.COLORS.colorMainDark,
                borderRadius:10,
                borderWidth: 1,
                borderColor: 'rgba(28,117,227,0.98)'
            }}
            key = { d.id}>

                    <LabelHorizontal 
                    LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                    texto = "Fecha:" value = { moment(d.skiperTravelsTracing[0].datetracing ).format('YYYY-MM-DD hh:mm:ss')} />
            
                    <LabelHorizontal 
                    LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                    texto = "Pasajero:" value = { d.users.firstname } />
                    
                    <LabelHorizontal 
                    LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                    texto = "Total:" value = { d.total } />
                    

                  
                  

            </View>
        )
    })

    return(
        <ImageBackground 
                  style={{   width: wp("100%"),
                  flex:2,
                  backgroundColor: Theme.COLORS.colorMainDark
                  }}
                  source= {require('../../assets/alycoin_bg.png')}>  
        <View style = { Theme.MainContainer, {
            width: wp("100%"),
            height: hp("100%"),
            
        }}>


                 
            <Texto padding = { 10 } alignSelf = { "center" } marginVertical = { 0 }
            marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
            color = { Theme.COLORS.colorSecondary } fontFamily = { Theme.FONTS.LatoB }
            text = "Historial de viajes" />
            <ScrollView>

                {data ? (
                 Viajes 
                 ):null
                }
            </ScrollView>
        </View>
        </ImageBackground>
    )
}

export default HistorialDeViajes