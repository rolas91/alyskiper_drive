import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../utils/Style/Theme'

export default class Button extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
            style = { style(this.props).button }
            activeOpacity = {this.props.opacidad} onPress = { this.props.onPress }>
                {!this.props.isloading ? (
                    this.props.bicon == true ? (
                    <View style = {{
                        flexDirection: "row", width: "100%"
                    }}>
                        <View style = {{
                             alignItems: "center", justifyContent: "center", padding: 3,
                             paddingLeft: 10, width: "20%"
                        }}>
                            <Icon size = {this.props.iconsize || 25 } 
                            color = { this.props.iconcolor || Theme.COLORS.colorParagraph }
                            name = { this.props.nameicon } />
                        </View>
                        <View style = {{
                             alignItems: "flex-start", justifyContent: "center", padding: 3,
                             width:"80%"
                        }}>
                            <Text allowFontScaling= { false } numberOfLines= {1} style = { style(this.props).texto }
                            ellipsizeMode= "tail">
                                { this.props.text }
                            </Text>
                        </View>
                    </View>
                ) : (
                    <Text style = { style(this.props).texto }
                    numberOfLines= {1} ellipsizeMode= "tail" >
                        { this.props.text }
                    </Text>
                )
                ) : (
                    <ActivityIndicator size="large" color={ Theme.COLORS.colorSecondary } />
                )}
                
            </TouchableOpacity>
        )
    }
}

export const style = (props) => StyleSheet.create({
    button: {
        backgroundColor: props.colorfondo,
        alignItems:"center",
        borderBottomWidth: props.bborder ? props.borderWidth : 0,
        borderBottomColor: props.bborder ? props.borderColor : null,
        justifyContent: "center",
        height: props.height,
        borderRadius: props.borderRadius,
        padding: props.padding,
        width: props.width,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
    },
    texto: {
        color: props.textcolor,
        fontSize: props.fontSize,
        fontFamily: Theme.FONTS.Lato,
        textAlign: "left"
    }
});