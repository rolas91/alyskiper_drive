import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Texto from '../Texto'
import Theme from '../../utils/Style/Theme'

const GananciasTotales = props => {
    return (
        <View style = { Theme.MainContainer, {
            marginRight:10,
            marginLeft:10,
            marginTop:10,
            paddingTop:10,
            paddingBottom:10,
            backgroundColor:Theme.COLORS.colorMainDark,
            borderRadius:20,
            borderWidth: 1,
            opacity: .7,
            borderColor: 'rgba(28,117,227,0.98)'
        }}>
            <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems: 'center',
            marginRight: 10, marginLeft: 10,marginBottom:10}}>
                <Icon name='arrow-up' size={50} color="rgba(28,117,227,0.98)"/>
            <View
            style = {{
                height: 100,
                width: 3,
                backgroundColor: 'rgba(28,117,227,0.98)'
                }}
            />
                <View style={{ width: '60%', }}>
                    <Texto alignSelf = { "flex-start" } justifyContent={"flex-start"} marginVertical = { 0 }
                    marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                    color = { 'rgba(28,117,227,0.98)' } fontFamily = { Theme.FONTS.LatoB }
                    text = "Ganancias Totales" />    
                    <Texto alignSelf = { "flex-start" } justifyContent={"flex-start"} marginVertical = { 0 }
                    marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                    color = { 'white' } fontFamily = { Theme.FONTS.LatoB }
                    text = "880" />  
                </View>
            </View>
        </View>    
    )
}

export default GananciasTotales