import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import Theme from '../utils/Style/Theme'
import AsyncStorage from '@react-native-community/async-storage'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import LabelHorizontal from '../components/LabelHorizontal'
import Imagen from '../components/Imagen'

const PerfilVehiculo = () => {

    const[VehiculoInfo, setVehiculoInfo] = useState(null)

  function  displayJsxMessage() {

    switch(VehiculoInfo.vehicleCatalog.id) {

                   
                  
        case 4:

           
     return    (<Imagen ContenedorborderRadius = { 10 } width = { wp("90%") } 
     height = { hp("30%") } padding = { 5 } borderColor = { Theme.COLORS.colorSecondary }
     borderWidth = { 1 } ImageborderRadius = { 10 } widthImage = { wp("89%") }
     heightImage = { hp("29%") } marginVertical = { 10 } marginHorizontal = { 0 }
     source =  {require('../../assets/img/micarro.png') }/>)

        case 5:
        return    (<Imagen ContenedorborderRadius = { 10 } width = { wp("90%") } 
     height = { hp("30%") } padding = { 5 } borderColor = { Theme.COLORS.colorSecondary }
     borderWidth = { 1 } ImageborderRadius = { 10 } widthImage = { wp("89%") }
     heightImage = { hp("29%") } marginVertical = { 10 } marginHorizontal = { 0 }
     source =  {require('../../assets/img/mibicicleta.png') }/>)

        case 6:
                   
     return    (<Imagen ContenedorborderRadius = { 10 } width = { wp("90%") } 
     height = { hp("30%") } padding = { 5 } borderColor = { Theme.COLORS.colorSecondary }
     borderWidth = { 1 } ImageborderRadius = { 10 } widthImage = { wp("89%") }
     heightImage = { hp("29%") } marginVertical = { 10 } marginHorizontal = { 0 }
     source =  {require('../../assets/img/moto.png') }/>)
        case 8:
                
                return    (<Imagen ContenedorborderRadius = { 10 } width = { wp("90%") } 
                height = { hp("30%") } padding = { 5 } borderColor = { Theme.COLORS.colorSecondary }
                borderWidth = { 1 } ImageborderRadius = { 10 } widthImage = { wp("89%") }
                heightImage = { hp("29%") } marginVertical = { 10 } marginHorizontal = { 0 }
                source =  {require('../../assets/img/apie.png') }/>)
        default:
        return
      }

    

    }



    useEffect(()=> {
        async function getUser() {
            var x = await AsyncStorage.getItem('skiperStorage')
            setVehiculoInfo(JSON.parse(x).vehicle)
        }
        getUser()
    }, [setVehiculoInfo])

    if(VehiculoInfo == null)
        return(
            <ActivityIndicator size="large" color={ Theme.COLORS.colorSecondary } />
        )

    return(
        <View style= { Theme.MainContainer, { height: hp("100%"), width: wp("100%"), 
 }}>
            
            {displayJsxMessage()}

            <ScrollView style = {{
                paddingHorizontal: 10
            }}>

                <LabelHorizontal
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                texto = { "Placa:" } value = { VehiculoInfo.license_plate  }/>

                <View style = {{ paddingVertical: 5 }}/>

                <LabelHorizontal
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                texto = { "Categoria:" } value = { VehiculoInfo.skiperCatTravel.name  }/>

                <View style = {{ paddingVertical: 5 }}/>

                <LabelHorizontal 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                texto = { "Tipo:" } value = { VehiculoInfo.vehicleCatalog.name  }/>

                <View style = {{ paddingVertical: 5 }}/>

                <LabelHorizontal 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                texto = { "Modelo:" } value = { VehiculoInfo.vehicleModel.name  }/>

                <View style = {{ paddingVertical: 5 }}/>

                <LabelHorizontal 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                texto = { "Marca:" } value = { VehiculoInfo.vehicleTrademark.name  }/>

                <View style = {{ paddingVertical: 5 }}/>

                <LabelHorizontal 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                texto = { "Año:" } value = { VehiculoInfo.vehicleYear.year  }/>

            </ScrollView>
        </View>
    )
}

export default PerfilVehiculo