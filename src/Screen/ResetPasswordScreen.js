import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Image, Dimensions, ScrollView, StatusBar
} from 'react-native';
import Theme from '../utils/Style/Theme.js';
import { useMutation  } from '@apollo/react-hooks';
import * as Animatable from 'react-native-animatable'
import Texto from '../components/Texto';
import Button from '../components/Button'
import ModalPicker from '../components/ModalPicker'
import { RESET } from '../graphql/mutations/Reset'
import Input from '../components/Input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { showMessage } from 'react-native-flash-message';

var {height, width} = Dimensions.get('window');


const ResetPasswordScreen = (props) => {

    const [Reset, { loading, data, error }] = useMutation(RESET)
    const [details, setDetails] = useState({})
    const [numberPhone, setnumberPhone] = useState("")
    const { navigate } = props.navigation
    
    const handleOnSelect = (details) => {
      setDetails(details)
    }

    const VerificarNumber = async () => {
        try {
            if(numberPhone == "")
            {
              alert("Ingrese el numero de telefono")
              return;
            }
            const result = await Reset( { variables: { phone_number: `${details.phoneCode}${numberPhone}` }})
            const { error, data } = result.data.reset_password
            if (error.message === 'Max send attempts reached') {
              showMessage({
                message: 'Error',
                description: error.message,
                backgroundColor: 'red',
                color: '#fff',
                icon: 'danger',
                titleStyle: {
                  fontFamily: 'Lato-Bold'
                },
                textStyle: {
                  fontFamily: 'Lato-Regular'
                }
              })
              return
            }
            if(error.message === 'Phone not exist!!')
            {
              showMessage({
                message: 'Error',
                description: error.message,
                backgroundColor: 'red',
                color: '#fff',
                icon: 'danger',
                titleStyle: {
                  fontFamily: 'Lato-Bold'
                },
                textStyle: {
                  fontFamily: 'Lato-Regular'
                }
              })
              return
            }
            if(data)
              navigate('VerifyCodeScreen', {
                id: data.id,
                number: `${details.phoneCode}${numberPhone}`
              })
        }
        catch(e){
            alert(e);
        }
    }

    return(
        <ScrollView contentContainerStyle = {{
            flexGrow: 1
        }} keyboardShouldPersistTaps= "always">
            <StatusBar  barStyle="light-content" backgroundColor = {Theme.COLORS.colorMainDark} />
            <ImageBackground
            source={require('../../assets/img/img-background.png')} 
            style={{ width: "100%", height: "100%", backgroundColor: Theme.COLORS.colorMainDark}}>
              <View style={{ 
                flex:1,
                alignItems:"center",
                justifyContent:"center",
                paddingHorizontal: 20,
                backgroundColor: 'rgba(0,0,0,.5)'
              }}>
                <Animatable.View animation="zoomIn" iterationCount = {1} 
                style = {{
                    alignItems:"center", justifyContent:"center"
                }}>
                    <Image 
                        source= {require('../../assets/img/img-logo-skiper.png')} 
                        style={{
                          height: height * 0.2, width: width * 0.7,
                          resizeMode: "contain"
                    }} />
                </Animatable.View>
                <Animatable.View animation = "slideInLeft" iterationCount = {1} > 
                    <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                    marginHorizontal = { 0 } fontSize = { Theme.SIZES.title } 
                    color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                    text = {"Restablecer Contraseña" }/>
                </Animatable.View>
                <View style={{ paddingVertical: 10 }} />
                  <View style={styles.container}>
                    <ModalPicker handleOnSelect={handleOnSelect}/>
                    <Input nameicon = {"phone"} borderWith = {0.3} 
                    borderRadius={35} alto = { height * 0.07 }
                    ancho = { width * 0.5}
                    marginBottom = { height * 0.007 }
                    multiline = {false} autoCapitalize = "none" autoCorrect = {false}
                    editable = {true} keyboardType = "numeric" returnKeyType = "next"
                    placeholder = "Numero" placeholderTextColor = { Theme.COLORS.colorSecondary }
                    secureTextEntry = { false }
                    onChangeText={(text) => {
                      setnumberPhone(text)
                    }}/>
                  </View>

                  <View style={{ paddingVertical: 15 }} />
                  <Button isloading = { loading } opacidad = {0.9} bicon = { false } 
                  text = 'CONFIRMAR' bborder = {true}  borderWidth = {1} 
                  borderColor = {Theme.COLORS.colorSecondary}
                  height = {hp("8%")} width = {wp("70%")}
                  colorfondo ={ Theme.COLORS.colorMainDark } 
                  marginTop = {0} marginBottom = {0} marginLeft = {0} marginRight = {0}
                  padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                  fontSize = { Theme.SIZES.normal }
                  onPress = { !loading ? () => VerificarNumber() : null }/>

                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      justifyContent: 'center',
      paddingHorizontal: 10,
      flexDirection: "row",
      width: '100%',
      backgroundColor: Theme.COLORS.colorMainDark,
      borderColor: Theme.COLORS.colorSecondary,
      borderWidth: 0.5,
      borderRadius: 200
    },
    stylesInput: {
      backgroundColor: Theme.COLORS.colorMainDark,
      borderRadius: 100,
      paddingLeft: 55,
      paddingVertical: 12,
      marginBottom: height * 0.03,
      borderWidth: 0.3,
      borderColor: Theme.COLORS.colorSecondary,
      fontFamily: 'Lato-Regular',
      fontSize: Theme.SIZES.small,
      color: Theme.COLORS.colorParagraph
    }
  })
  
  export default ResetPasswordScreen
  