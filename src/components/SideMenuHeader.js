import React, { useEffect } from 'react'
import {Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Theme from '../utils/Style/Theme'
import { withNavigation } from 'react-navigation'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Texto from './Texto';
import Imagen from './Imagen';

const SidemenuHeader = (props) => {

    return (
        <View style = {{
            padding: 10,
            borderWidth: 0.3,
            borderBottomColor: Theme.COLORS.colorSecondary
        }}>           
            <View>
                <Image source = {require('../../assets/img/img-logo-skiper.png')}
                
                style= {{ 
                    alignItems: "center",
                    justifyContent:"center",
                    height: hp("20%"), width: wp("50%"),
                    marginLeft:'10%'
                    
                }} resizeMode = "contain">
                </Image>
            </View>
            <View style = {{
                flexDirection: "row"
            }}>
                <TouchableOpacity activeOpacity = { 0.8 } style = {{
                    width: wp("100%"), flexDirection: "row"
                }} onPress = {()=> {
                    props.navigation.navigate("InfoUsuario")
                }}>
                    <Imagen ContenedorborderRadius = { (hp("10%")) / 2 } width = { hp("10%") } 
                    height = { hp("10%") } padding = { 5 } borderColor = { Theme.COLORS.colorSecondary }
                    borderWidth = { .5 } ImageborderRadius = { ( hp("9%") ) / 2 } widthImage = { hp("9%") }
                    heightImage = { hp("9%") } marginVertical = { 0 } marginHorizontal = { 0 }
                    source = {{ uri: props.avatar }}/>
                    <View style = {{
                        marginLeft: 5, justifyContent: "center", maxWidth: "70%",
                    }}>
                        <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.normal } 
                        color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.Lato }
                        text = { props.name } textAlign = "left"  />

                        <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.small }
                        numberOfLines = { 1 } color = { Theme.COLORS.colorParagraphSecondary } 
                        fontFamily = { Theme.FONTS.LatoB } text = { props.email } textAlign = "left"  />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default withNavigation(SidemenuHeader)
