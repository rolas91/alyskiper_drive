import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@apollo/react-hooks'
import { KeycodeInput } from 'react-native-keycode'
import { VERIFYCODE } from '../graphql/mutations/Mutations'
import Theme from '../utils/Style/Theme'
import * as Animatable from 'react-native-animatable'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Texto from '../components/Texto'
import Button from '../components/Button'

const VerifyCodeScreen = props => {
  const { navigate } = props.navigation
  const [VerifyCode, { loading }] = useMutation(VERIFYCODE)
  const [code, setCode] = useState('')
  const [numberPhone] = useState(props.navigation.getParam('number', ''))
  const [id] = useState(props.navigation.getParam('id', ''))

  const handleOnSubmit = async () => {
    const result = await VerifyCode({ variables: { verifycode: { phone_number: numberPhone, channel: 'sms', code: `${code}` } } })
    const { message } = result.data.verify_code

    if (message === 'Could not send verification code') {
      showMessage({
        message: 'Error',
        description: message,
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
    } else {
      //MANDAMOS A NAVEGAR A LA OTRA DONDE CAMBIAMOS LA CONTRASENA
      navigate('ResetScreen', {
        id: id
      })
    }
  }

  return (
    <ImageBackground
    source={require('../../assets/img/img-background.png')} 
    style={{ width: "100%", height: "100%", backgroundColor: Theme.COLORS.colorMainDark}}>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.container}>
                <Animatable.View animation="zoomIn" iterationCount = {1} 
                style = {{
                    alignItems:"center", justifyContent:"center"
                }}>
                    <Image 
                        source= {require('../../assets/img/img-logo-skiper.png')} 
                        style={{
                          height: hp("20%"), width: wp("20%"),
                          resizeMode: "contain"
                    }} />
                </Animatable.View>
                <Animatable.View animation = "slideInLeft" iterationCount = {1} > 
                    <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                    marginHorizontal = { 0 } fontSize = { Theme.SIZES.title } 
                    color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                    text = { "INGRESE EL CODIGO" }/>
                </Animatable.View>
                <Text allowFontScaling={ false } 
                style={ styles.description }>
                    Hemos enviado un codigo de verificación a tu numero de telefono.
                </Text>
                <View style={styles.containerMain}>
                    <KeycodeInput
                    length={6}
                    textColor={Theme.COLORS.colorParagraph}
                    tintColor={Theme.COLORS.colorSecondary}
                    value={code}
                    autoFocus
                    numeric
                    style={{}}
                    onComplete={ handleOnSubmit }
                    onChange={value => setCode(value)}
                    />
                </View>
                <View style={styles.containerButton}>
                <Button isloading = { loading } opacidad = {0.9} bicon = { false } 
                text = 'VERIFICAR' bborder = {true}  borderWidth = {1} 
                borderColor = {Theme.COLORS.colorSecondary}
                height = {hp("8%")} width = {wp("70%")}
                colorfondo ={ Theme.COLORS.colorMainDark } 
                marginTop = {0} marginBottom = {0} marginLeft = {0} marginRight = {0}
                padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                fontSize = { Theme.SIZES.normal }
                onPress = { !loading ? () => VerificarNumber() : null }/>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  containerMain: {
    marginTop: 30
  },
  containerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  scrollView: {
    flexGrow: 1
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  description: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 180,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  }
})

export default VerifyCodeScreen
