import React from 'react'
import Modal from 'react-native-modal'
import { View } from 'react-native'
import Theme from '../utils/Style/Theme'
import LabelVertical from './LabelVertical'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Buttonicon from './ButtonIcon'
import Texto from './Texto'
import TextoDosColumna from './TextoDosColumna'

const  ModalViewViaje = (props) => {

    return(
        <Modal
        // backdropOpacity = { 1 }
        // hasBackdrop = { true }
        animationIn = "fadeIn"
        animationInTiming = { 500 }
        animationOut = "fadeOut"
        animationOutTiming = { 500 }
        // backdropColor = { Theme.COLORS.colorMainDark }
        hideModalContentWhileAnimating = { true }
        style = {{
            paddingHorizontal: 10, 
            justifyContent: "flex-start",
        }}
        useNativeDriver = { true }
        isVisible={ props.visible }
        onRequestClose={props.onPressClose}>
            <>
                <View style={{
                    padding: 10,
                    marginVertical: 5,
                    backgroundColor: Theme.COLORS.colorParagraph,
                    borderRadius: 10
                }}> 
                    <Texto padding = { 15 } alignSelf = { "center" } marginVertical = { 0 }
                    marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                    color = { Theme.COLORS.colorMainDark } fontFamily = { Theme.FONTS.LatoB }
                    text = "Detalle del viaje" />

                    <LabelVertical
                    LabelSize = { Theme.SIZES.subTitle } LabelColor = { Theme.COLORS.colorMainDark }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorMain }
                    text = { "Codigo" } value = { props.data.id }/>
                    <LabelVertical 
                    LabelSize = { Theme.SIZES.subTitle } LabelColor = { Theme.COLORS.colorMainDark }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorMain }
                    text = { "Fecha" } value = { props.data.fecha }/>
                    <LabelVertical 
                    LabelSize = { Theme.SIZES.subTitle } LabelColor = { Theme.COLORS.colorMainDark }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorMain }
                    text = { "Hora inicial" } value = { props.data.horainicio }/>
                    <LabelVertical 
                    LabelSize = { Theme.SIZES.subTitle } LabelColor = { Theme.COLORS.colorMainDark }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorMain }
                    text = { "Hora final" } value = { props.data.horafin }/>

                    <LabelVertical 
                    LabelSize = { Theme.SIZES.subTitle } LabelColor = { Theme.COLORS.colorMainDark }
                    ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorMain }
                    text = { "ganancia" } value = { props.data.Ganacia }/>

                    <Texto padding = { 15 } alignSelf = { "center" } marginVertical = { 0 }
                    marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                    color = { Theme.COLORS.colorMainDark } fontFamily = { Theme.FONTS.LatoB }
                    text = "Resumen" />

                    <TextoDosColumna textfirtscolumn = { "Tarifa base"} textsecondcolumn = { "40" }/>
                    <TextoDosColumna textfirtscolumn = { "20 min"} textsecondcolumn = { "20" }/>
                    <TextoDosColumna textfirtscolumn = { props.data.distancia } textsecondcolumn = { "32" }/>
                    <TextoDosColumna textfirtscolumn = { "Total" } textsecondcolumn = { "C$ 92" }/>
                
                </View>
                <View style = {{
                    alignSelf: "center"
                }}>
                    <Buttonicon padding = { 5 }
                    borderRadius = { 30 }
                    opacity = {.7}
                    iconsize = {25}
                    iconcolor = {Theme.COLORS.colorMainDark}
                    backgroundColor = { Theme.COLORS.colorSecondary }
                    iconname = { "close" }
                    onPress = { props.onPressClose }/>
                </View>
            </>
        </Modal>
    )
}

export default ModalViewViaje