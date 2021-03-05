import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Texto = (props) => {
    return(
        <View style={ style(props).contenedorText }>
            <Text 
            numberOfLines = { props.numberOfLines } 
            ellipsizeMode = "tail"
            allowFontScaling = { false } style={style(props).Text}>
                { props.text }
            </Text>
        </View>
    )
}

const style = (props) => StyleSheet.create({
    contenedorText: {
        width: "100%",
        padding: props.padding,
        alignSelf: props.alignSelf,
        marginVertical: props.marginVertical,
        marginHorizontal: props.marginHorizontal
    },
    Text: {
        width:"100%",
        fontSize: props.fontSize, 
        color: props.color,
        fontFamily: props.fontFamily,
        textAlign: props.textAlign ? props.textAlign : "center"
    }
})

export default Texto