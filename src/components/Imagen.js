import React from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import Buttonicon from './ButtonIcon'
import Theme from '../utils/Style/Theme'

const Imagen = (props) => {
    return(
        <>
            <View style={ style(props).contenedorimage }>
                <Image style = { style(props).image } 
                source = { props.source != null ? props.source : require('../../assets/img/user.png') } />
                { props.buttonicon && !props.loading ? (
                    <Buttonicon 
                    style = { style(props).ButtonCamara }
                    iconsize = {25}
                    iconcolor = {Theme.COLORS.colorMainDark}
                    iconname = { "camera-alt" }
                    onPress = {props.ButtoniconOnpress}/>
                ) : null}
                { props.loading ? 
                    <View style = {{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: 200,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,.8)"
                    }}>
                        <ActivityIndicator color= { Theme.COLORS.colorSecondary } size = "large" />
                    </View>
                : null }
            </View>
        </>
    )
}

const style = (props) => StyleSheet.create({
    contenedorimage: {
        borderRadius: props.ContenedorborderRadius, 
        width: props.width,
        height: props.height,
        padding: props.padding,
        justifyContent:'center', 
        alignItems: 'center',
        backgroundColor: props.fondocolor,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        alignSelf: "center",
        marginVertical: props.marginVertical,
        marginHorizontal: props.marginHorizontal
    },
    image: {
        borderRadius: props.ImageborderRadius, 
        width: props.widthImage,
        height: props.heightImage,
        position: 'absolute'
    },
    ButtonCamara: {
        position: "absolute",
        top: props.topButton,
        left: props.LeftButton,
        backgroundColor: Theme.COLORS.colorSecondary,
        padding: 10, 
        borderRadius: 30,
    }
})

export default Imagen