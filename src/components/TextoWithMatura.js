import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const TextoWithMatura = (props) => {
    return(
        <View allowFontScaling = { true } style={ style(props).contenedorText }>
            <Text allowFontScaling = { false } style={{
                fontSize: props.fontSize, 
                color: props.color,
                fontFamily: "MATURASC",
                textAlign: props.textAlign ? props.textAlign : "center"
            }}>
                { props.text.charAt(0) }
            </Text>
            <Text allowFontScaling = { false } style={style(props).Text}>
                { props.text.substring(1) }
            </Text>
        </View>
    )
}

const style = (props) => StyleSheet.create({
    contenedorText: {
        padding: props.padding,
        alignSelf: props.alignSelf,
        marginVertical: props.marginVertical,
        marginHorizontal: props.marginHorizontal,
        flexDirection: "row"
    },
    Text: {
        fontSize: props.fontSize, 
        color: props.color,
        fontFamily: props.fontFamily,
        textAlign: props.textAlign ? props.textAlign : "center"
    }
})

export default TextoWithMatura