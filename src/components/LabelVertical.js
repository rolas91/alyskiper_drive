import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Theme from '../utils/Style/Theme'

const LabelVertical = (props) => {
    return(
        <View style= {style.contenedorlabel}>
            <Text style={style(props).textlabel}>
                { props.text }
            </Text>
            <Text style={ style(props).textValue }>
                { props.value }
            </Text>
        </View>
    )
}

var style = (props) => StyleSheet.create({
    contenedorlabel: {
        flexDirection:"column",
        justifyContent:"flex-start", 
        alignItems: "flex-start", 
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    textlabel: {
        fontSize: props.LabelSize, 
        color: props.LabelColor,
        fontFamily: Theme.FONTS.LatoB
    },
    textValue: {
        fontSize: props.ValueSize, 
        color: props.ValueColor,
        fontFamily: Theme.FONTS.Lato
    }
})

export default LabelVertical