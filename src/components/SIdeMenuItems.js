import React from 'react'
import {Text, View, TouchableOpacity } from 'react-native';
import Theme from '../utils/Style/Theme'
import ButtonIcon from './ButtonIcon'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Texto from './Texto';

export default class SidemenuItems extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <TouchableOpacity style = {{
                flexDirection: "row", padding: 5, width: "100%"
            }}
            onPress = {this.props.onPress}>
                <View style = {{
                    width: "80%", flexDirection: "row",
                    alignItems: "center", justifyContent: "flex-start"
                }}>
                    <Icon size = { this.props.iconsize } color = { this.props.iconcolor }
                    name = { this.props.iconname }/>
                    <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                    marginHorizontal = { 5 } fontSize = { this.props.textsize } 
                    color = { this.props.textcolor } fontFamily = { Theme.FONTS.Lato }
                    text = { this.props.Texto } textAlign = "left"  />
                </View>
                <View style = {{
                    width: "20%",
                    alignItems: "center", justifyContent: "center"
                }}>
                    <ButtonIcon padding = {5} 
                    borderRadius = {30}
                    opacity = {.8}
                    iconsize = {25}
                    iconcolor = {Theme.COLORS.colorSecondary}
                    iconname = "navigate-next"
                    />
                </View>
            </TouchableOpacity>
        )
    }
}