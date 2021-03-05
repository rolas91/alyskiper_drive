import React from 'react'
import { ImageBackground, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Imagen from '../Imagen';
import Texto from '../Texto';
import { useSelector } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Theme from '../../utils/Style/Theme';

const InfoViaje = () => {

    const newTravels = useSelector(x => x.NewTravels)

    return(
        <ImageBackground style = {{
            position: "absolute",
            width: wp("100%"),
            height: hp("45%"),
            opacity: 0.9,
            bottom: hp("10%")
        }} source = { require("../../../assets/img/ImagenesGenerales/fondo3.png")}>
            <View style={ style.ContenedorImagen }>
                <Imagen ContenedorborderRadius={(wp('25%')) / 2} width={wp('25%')}
                height={wp('25%')} padding={3} fondocolor={Theme.COLORS.colorSecondary}
                ImageborderRadius={(wp('23%')) / 2} widthImage={wp('23%')}
                heightImage={wp('23%')} marginVertical={0} marginHorizontal={0}
                source={null} />
            </View>
            <View style={{
                position: "absolute",
                bottom: "30%",
                width: "100%",
                padding: 5
            }}>
                <Texto padding={2} alignSelf={"center"} marginVertical={0}
                marginHorizontal={0} fontSize={Theme.SIZES.normal}
                color="white" fontFamily={Theme.FONTS.LatoB}
                text={ newTravels.users.firstname + " " + newTravels.users.lastname }/>

                <View style={{
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', paddingBottom: 5
                }}>
                    <View style = {{
                        width: "20%", alignItems: "center", justifyContent: "center"
                    }}>
                        <Imagen ContenedorborderRadius={(hp('7%')) / 2} width={hp('7%')}
                        height={hp('7%')} padding={3} borderColor={Theme.COLORS.colorUnderline}
                        borderWidth={1}
                        ImageborderRadius={(hp('7%')) / 2} widthImage={hp('6%')}
                        heightImage={hp('6%')} marginVertical={0} marginHorizontal={ 0 }
                        source={require('../../../assets/img/Location_Skiper/Skipper_RedInicio.png')} />
                    </View>

                    <View style={{ 
                        width: '80%', 
                        height: "100%", 
                        justifyContent:"center", 
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity style = {{
                            width: "75%", justifyContent: "center",
                            alignItems:"flex-start"
                        }} onPress={() => {
                            alert("Origen: " + newTravels.address_initial);
                        }}>
                            <Text
                            numberOfLines={ 3 }
                            ellipsizeMode = "tail"
                            style={{
                                color: '#03F9FC',
                                fontFamily: "Lato-Regular",
                                fontSize: Theme.SIZES.small,
                                width: "100%",
                                borderBottomColor: Theme.COLORS.colorUnderline,
                                borderBottomWidth: 0.3,
                            }}>
                                { newTravels.address_initial }
                            </Text>
                        </TouchableOpacity>
                        <Text numberOfLines = { 1 } 
                        ellipsizeMode = "tail"
                        style={{
                            color: '#03F9FC',
                            fontFamily: "Lato-Regular",
                            fontSize: Theme.SIZES.small,
                            alignSelf: "center",
                            marginLeft: 3,
                            width: "20%",
                            borderBottomColor: Theme.COLORS.colorUnderline,
                            borderBottomWidth: 0.3
                        }}>
                            {Math.round(newTravels.duration / 60) + " Min"}
                        </Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', paddingBottom: 5
                }}>
                    <View style = {{
                        width: "20%", alignItems: "center", justifyContent: "center"
                    }}>
                        <Imagen ContenedorborderRadius={(hp('7%')) / 2} width={hp('7%')}
                        height={hp('7%')} padding={3} borderColor={Theme.COLORS.colorUnderline}
                        borderWidth={1}
                        ImageborderRadius={(hp('7%')) / 2} widthImage={hp('6%')}
                        heightImage={hp('6%')} marginVertical={0} marginHorizontal={ 0 }
                        source={require('../../../assets/img/Location_Skiper/Skipper_GreenDest.png')} />
                    </View>

                    <View style={{ 
                        width: '80%', 
                        height: "100%", 
                        justifyContent:"center", 
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity style = {{
                            width: "75%", justifyContent: "center",
                            alignItems:"flex-start"
                        }} onPress={() => {
                            alert("Origen: " + newTravels.address_initial);
                        }}>
                            <Text
                            numberOfLines={ 3 }
                            ellipsizeMode = "tail"
                            style={{
                                color: '#03F9FC',
                                fontFamily: "Lato-Regular",
                                fontSize: Theme.SIZES.small,
                                width: "100%",
                                borderBottomColor: Theme.COLORS.colorUnderline,
                                borderBottomWidth: 0.3,
                            }}>
                                { newTravels.address_final }
                            </Text>
                        </TouchableOpacity>
                        <Text numberOfLines = {1} ellipsizeMode = "tail" style={{
                            color: '#03F9FC',
                            fontFamily: "Lato-Regular",
                            fontSize: Theme.SIZES.small,
                            alignSelf: "center",
                            marginLeft: 3,
                            width: "20%",
                            borderBottomColor: Theme.COLORS.colorUnderline,
                            borderBottomWidth: 0.3
                        }}>
                            {Math.round(newTravels.distance / 1000) + " KM"}
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    ContenedorImagen: {
      width: wp('100%'),
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      position: "absolute",
      bottom: hp('35'),
    },
    linearGradient: {
      height: "100%",
      paddingLeft: 15,
      paddingRight: 15,
      width: '100%'
    },
    Barra: {
      flex: 0.10,
      shadowOffset: { width: 10, height: 1000 },
      borderBottomWidth: 0,
      shadowColor: 'rgba(28,117,227,0.98)',
      elevation: 10,
      backgroundColor: "rgba(28,117,227,0.98)"
    },
  })

export default InfoViaje