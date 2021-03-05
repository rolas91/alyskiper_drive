import React, { useState } from 'react'
import { View, ScrollView, ImageBackground} from 'react-native'
import Theme from '../utils/Style/Theme'
import Texto from '../components/Texto'
import GananciasDelDia from '../components/Ganancias/GananciasDelDia'
import SaldoHabilitado from '../components/Ganancias/SaldoHabilitado'

const Ganancias = props => {

    const [wallet] = useState(props.navigation.getParam('wallet', null))
    console.log(wallet)

    return(
            <ImageBackground 
            style={{   
                width: "100%",
                height: "100%",
                backgroundColor: Theme.COLORS.colorMainDark
            }} source= {require('../../assets/alycoin_bg.png')}> 
                    <View style = { Theme.MainContainer, {
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}>   
                        <Texto  padding = { 10 } alignSelf = { "center" } marginVertical = { 0 }
                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                        color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                        text = { "Detalle de la wallet " + wallet.currencyID.name } textAlign = "left" />
                        <ScrollView>
                            <GananciasDelDia navigation = { props.navigation } titulo = "Ganancias del dia" 
                            idwallet = { wallet.id } bgananciastotales = { false }/>
                            <SaldoHabilitado navigation = { props.navigation } idwallet = { wallet.id }/>
                            <GananciasDelDia navigation = { props.navigation } titulo = "Ganancias totales" 
                            idwallet = { wallet.id } bgananciastotales = { true }/>
                            {/* se comenta esto porque de momento esta funcionalidad no se realizara */}
                            {/* <RetirosTotales/> */}
                        </ScrollView>
                    </View>
            </ImageBackground>
    )
}

export default Ganancias