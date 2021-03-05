import React from 'react'
import { View } from 'react-native'
import Texto from './Texto'
import Theme from '../utils/Style/Theme'

const TextoDosColumna =  (props) => {

    return(
        <View style = {{
            flexDirection: "row",
            justifyContent:"space-between",
            borderBottomWidth: .2,
            borderBottomColor: Theme.COLORS.colorSecondary,
            borderRadius: 200,
            padding: 5
        }}>
            <View style = {{
                width: "50%"
            }}>
                <Texto padding = { 5 } alignSelf = { "center" } marginVertical = { 0 }
                marginHorizontal = { 0 } fontSize = { Theme.SIZES.normal } 
                color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                text = { props.textfirtscolumn } textAlign = "left"  />
            </View>
            <View style = {{
                width: "50%"
            }}>
                <Texto padding = { 5 } alignSelf = { "center" } marginVertical = { 0 }
                marginHorizontal = { 0 } fontSize = { Theme.SIZES.normal } 
                color = { Theme.COLORS.colorParagraphSecondary } fontFamily = { Theme.FONTS.LatoB }
                text = { props.textsecondcolumn } textAlign = "right" />
            </View>
        </View>
    )
}

export default TextoDosColumna