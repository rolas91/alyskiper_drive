import React from 'react';
import { View, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Button from './Button';
import Theme from '../utils/Style/Theme';
var { height, width } = Dimensions.get("window")
import Texto from './Texto'

const ModalConfirm = (props) => {

    return (
        <ImageBackground source = {
            require('../../assets/img/ImagenesGenerales/BackgroundError.png')
        } imageStyle = {{ borderRadius: 10 }}
        style= { Theme.MainContainer, {
            alignItems: "center",
            width: width * 0.9,
            justifyContent: "center",
            paddingVertical: 30
        }}>

            <Texto padding = { 10 } alignSelf = { "center" } marginVertical = { 0 }
            marginHorizontal = { 0 } fontSize = { Theme.SIZES.normal } 
            color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
            text = { props.text } />

            <View style = { style.contenedorBotones }>
                <Button opacidad = {0.7} bicon = { false } text = 'SI'
                bborder = { true }  borderWidth = { 1 } 
                borderColor = { Theme.COLORS.colorSecondary }
                height = { height * 0.06 } width = "40%"
                colorfondo ={ Theme.COLORS.colorMainDark }
                marginTop = {0} marginBottom = {0} marginLeft = {3} marginRight = {3}
                padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                fontSize = { Theme.SIZES.xsmall }
                onPress = { props.onPressConfirm }/>

                <Button opacidad = {0.7} bicon = { false } text = 'NO'
                bborder = { true }  borderWidth = { 1 } borderColor = {Theme.COLORS.colorSecondary}
                height = { height * 0.06 } width = "40%"
                colorfondo = { Theme.COLORS.colorMain } 
                marginTop = {0} marginBottom = {0} marginLeft = {3} marginRight = {3}
                padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                fontSize = { Theme.SIZES.xsmall }
                onPress = { props.onPressCancel }/>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    contenedorBotones: {
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
        flexDirection: "row"
    }
})

export default ModalConfirm