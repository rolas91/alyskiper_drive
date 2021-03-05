import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Theme from '../utils/Style/Theme'

const LabelHorizontal = (props) => {
    return(
        <View style= { style(props).contenedor }>
            <Text style={ style(props).textlabel }>
                { props.texto }
            </Text>
            <Text style={ style(props).textvalue }>
                { props.value }
            </Text>
        </View>
    )
}

const style = (props) => StyleSheet.create({
    contenedor : {
        flexDirection:"row",
        justifyContent:"flex-start", 
        alignItems: "center", 
        width: "100%",
    },
    textlabel : {
        height: "100%",
        fontSize: props.LabelSize, 
        color: props.LabelColor,
        fontFamily: Theme.FONTS.LatoB, 
        textAlignVertical: "bottom"
    },
    textvalue : {
        height: "100%",
        fontSize: props.ValueSize, 
        color: props.ValueColor,
        fontFamily: Theme.FONTS.Lato,
        textAlignVertical: "bottom",
        marginLeft: 5
    }
})

export default LabelHorizontal