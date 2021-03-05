import React, { useState } from 'react'
import {
    View,
    ImageBackground,ScrollView, StatusBar
} from 'react-native'
import { Formik } from 'formik'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Texto from '../components/Texto'
import Theme from '../utils/Style/Theme'
import FormValidationResetPassword from '../utils/formvalidation/ResetFormValidation'
import Input from '../components/Input'
import Button from '../components/Button'
import { EDITPASSWORD } from '../graphql/mutations/Mutations'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'

const ResetScreen = (props) => {

    const [EditPassword, { loading }] = useMutation(EDITPASSWORD)
    const [id] = useState(props.navigation.getParam('id', ''))
    const { navigate } = props.navigation

    const changuepasword = async (values, actions) => {
        try {
            actions.setSubmitting(false)
            const { data: { editPassword } } = await EditPassword({ variables: { input: { newPassword: values.contrasena, id } } })
            if (editPassword.message === 'Update password successfuly!!') {
                navigate('Login')
                showMessage({
                  message: 'AlySkiper',
                  description: 'Su contraseña fue actualizada correctamente.',
                  backgroundColor: 'green',
                  color: '#fff',
                  icon: 'success',
                  titleStyle: {
                    fontFamily: 'Lato-Bold'
                  },
                  textStyle: {
                    fontFamily: 'Lato-Regular'
                  }
                })
            }
        }
        catch(e){
            alert(e);
        }
    }

    return (
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
                paddingHorizontal: 20
              }}>
                <Formik
                    initialValues={{ 
                        contrasena: '',
                        showcontrasena: false,
                        confirmcontrasena: '',
                        showconfirmcontrasena: false
                    }}
                    onSubmit={(values, actions) => { changuepasword(values, actions) }}
                    validateOnChange = { true }
                    validationSchema={FormValidationResetPassword}
                    >
                    {formikProps => (
                        <View style={{ 
                            flex:1,
                            alignItems:"center",
                            justifyContent:"flex-start"
                        }}>
                            <View style = {{ paddingVertical: hp("10%") }} />
                            <View style = {{
                                paddingVertical: 5
                            }}>
                                <Input nameicon = {"lock"} borderWith = {0.3} 
                                borderRadius={35} alto = { hp("7%") }
                                value = { formikProps.values.contrasena }
                                ancho = { wp("80%") } borderColor = { 
                                    formikProps.errors.contrasena && formikProps.touched.contrasena ? 
                                    Theme.COLORS.colorError :
                                    Theme.COLORS.colorSecondary
                                } marginBottom = { hp("0.7%") }
                                multiline = {false} autoCapitalize = "none" autoCorrect = {false}
                                editable = {true} keyboardType = "default" returnKeyType = "next"
                                placeholder = "Contraseña" placeholderTextColor = { Theme.COLORS.colorSecondary }
                                secureTextEntry = { formikProps.values.showcontrasena ? false : true }
                                isoculto = { true } 
                                onChangeText={ formikProps.handleChange('contrasena') }
                                onFocus = {() => formikProps.setFieldTouched('contrasena') }
                                onBlur={ formikProps.handleBlur('contrasena') }
                                onclearText = { () => formikProps.setFieldValue('contrasena', '')}
                                onclearShowPassword = { () => {
                                    formikProps.setFieldValue('showcontrasena', !formikProps.values.showcontrasena)
                                }}/>
                                { formikProps.errors.contrasena && formikProps.touched.contrasena ? (
                                    <View style = {{
                                        width: wp("80%"),
                                        position: "absolute",
                                        left: 5, top: hp("7.5%")
                                    }}>
                                        <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.xsmall } 
                                        color = { Theme.COLORS.colorError } fontFamily = { Theme.FONTS.LatoB }
                                        text = { formikProps.errors.contrasena } textAlign = "left"  />
                                    </View> ) : null
                                } 
                            </View>
                            <View style = {{
                                paddingVertical: 5
                            }}>
                                <Input nameicon = {"lock"} borderWith = {0.3}
                                borderRadius={35} alto= { hp("7%") }
                                value = { formikProps.values.confirmcontrasena }
                                ancho = { wp("80%") } borderColor = { 
                                    formikProps.errors.confirmcontrasena 
                                    && formikProps.touched.confirmcontrasena ? Theme.COLORS.colorError :
                                    Theme.COLORS.colorSecondary
                                } marginBottom = { hp("7%") }
                                multiline = {false} autoCapitalize = "none" autoCorrect = {false}
                                editable = {true} keyboardType = "default" returnKeyType = "go"
                                placeholder = "Confirmar contraseña" 
                                placeholderTextColor = { Theme.COLORS.colorSecondary }
                                secureTextEntry = { formikProps.values.showconfirmcontrasena ? false :true } 
                                isoculto = { true }
                                onChangeText={formikProps.handleChange('confirmcontrasena')}
                                onFocus = {() => formikProps.setFieldTouched('confirmcontrasena') }
                                onBlur={formikProps.handleBlur('confirmcontrasena')}
                                onclearText = { () => formikProps.setFieldValue('confirmcontrasena', '')}
                                onclearShowPassword = { () => {
                                    formikProps.setFieldValue('showconfirmcontrasena', 
                                    !formikProps.values.showconfirmcontrasena)
                                }}
                                />
                                { formikProps.errors.confirmcontrasena && formikProps.touched.confirmcontrasena ? (
                                    
                                    <View style = {{
                                        width: wp("80%"),
                                        position: "absolute",
                                        left: 5, top: hp("7.5%")
                                    }}>
                                        <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.xsmall } 
                                        color = { Theme.COLORS.colorError } fontFamily = { Theme.FONTS.LatoB }
                                        text = { formikProps.errors.confirmcontrasena } textAlign = "left"  />
                                    </View> ) : null
                                }
                            </View>
                            
                            <Button isloading = { loading } opacidad = {0.9} bicon = { false } 
                            text = 'CONFIRMAR' bborder = {true}  borderWidth = {1} 
                            borderColor = {Theme.COLORS.colorSecondary}
                            height = {hp("8%")} width = {wp("70%")}
                            colorfondo ={ Theme.COLORS.colorMainDark } 
                            marginTop = {25} marginBottom = {0} marginLeft = {0} marginRight = {0}
                            padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                            fontSize = { Theme.SIZES.normal }
                            onPress = { !loading ? formikProps.handleSubmit : null }/>

                        </View> 
                    )}
                    </Formik>
              </View>
            </ImageBackground>
        </ScrollView>
    )
}

export default ResetScreen