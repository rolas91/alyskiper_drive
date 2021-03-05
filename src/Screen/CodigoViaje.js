import React from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Texto from '../components/Texto'
import Theme from '../utils/Style/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'

const CodigoViaje = () => {

    const newTravels = useSelector(x => x.NewTravels)

    return(
        <View style={ Theme.MainContainer, { 
            width: "100%", 
            height: "100%",
            backgroundColor: Theme.COLORS.colorMainDark,
            paddingVertical: 10
        }}>
            <View style = {{
                height: hp("50%")
            }}>
                <Texto padding = { 3 } marginVertical = { 0 }
                marginHorizontal = { 0 } fontSize = { Theme.SIZES.title } 
                color = { Theme.COLORS.colorSecondary } fontFamily = { Theme.FONTS.Lato }
                text = { "ID: " + newTravels.id + "-" + newTravels.users.id } />

                <View style = {{
                    marginVertical: 20,
                    alignItems: "center",
                    paddingVertical: 50,
                    backgroundColor: "white",
                    paddingVertical: 10
                }}>
                    <QRCode
                    value={ newTravels.id.toString() + " " + newTravels.users.id.toString()  }
                    size = { 250 }
                    logoSize = { 30 }
                    logoMargin = { 2 }
                    logoBackgroundColor='white'/>
                </View>
            </View>
      </View>
    )
}

export default CodigoViaje