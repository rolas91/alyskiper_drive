import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Texto from '../components/Texto'
import Theme from '../utils/Style/Theme'

const Pageerror = (props) => {
    
    const [error] = useState(props.navigation.getParam('error', ''))

    return(
        <View style = {{
            flex: 1,
            height: hp("100%"),
            width: wp("100%"),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Theme.COLORS.colorMainDark
        }}>
            <Image style = {{
                resizeMode: "contain",
                width: wp("60%"),
                height: hp("40%")
            }} source = {require('../../assets/img/error.png')}/>
            <Texto padding={10} alignSelf={"center"} marginVertical={0}
            marginHorizontal={0} fontSize={Theme.SIZES.normal}
            color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
            text={error } />
        </View>
    )
}

export default Pageerror