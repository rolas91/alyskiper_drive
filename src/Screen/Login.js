import React, { useEffect } from 'react';
import {Formik} from "formik";
import validationSchema  from "../utils/formvalidation/LoginFormValidation";
import {
    View,
    Text,
    ImageBackground,
    Image, Dimensions, TouchableOpacity, ScrollView, StatusBar
  } from 'react-native';
import Theme from '../utils/Style/Theme.js';
import Input from '../components/Input'
import AsyncStorage from '@react-native-community/async-storage'
import { useMutation  } from '@apollo/react-hooks'
import Button from '../components/Button'
import { SINGIN } from '../graphql/mutations/Login'
import * as Animatable from 'react-native-animatable'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Texto from '../components/Texto'
import { useDispatch } from 'react-redux'
import { SINGIN as singin } from '../Reducer/ActionTypes'
import VersionInfo from 'react-native-version-info'
var {height, width} = Dimensions.get('window')

const Login = ({ navigation }) => {

    const [IniciarSesion, { loading , data, error  }] = useMutation(SINGIN)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data) {
            console.log(data)
            if(data.signin.error != null)
                alert(data.signin.error.message)
                else if(data.signin.data != null) {
                    if(data.signin.data.vehicle == null)
                        alert("El usuario ingresado no esta afiliado como Drive")
                    else
                    {
                        console.log("--------------SIGN IN DATA---------------")
                        console.log(data.signin.data)
                        console.log("-----------------------------")
                        dispatch({ type: singin, payload: data.signin.data })
                        AsyncStorage.setItem('skiperStorage', JSON.stringify(data.signin.data))
                        navigation.navigate("FailedPermission")
                    }
                }
        }
    });

    const LoginOnpress = async (values, actions) => {
        try {
            actions.setSubmitting(false)
            IniciarSesion( { variables: { email: values.username, password: values.password } })
        }
        catch(e){
            alert(e);
        }
    }

    return(
        <ScrollView contentContainerStyle = {{
            flexGrow: 1
        }} keyboardShouldPersistTaps= "always">
            <StatusBar barStyle="light-content" backgroundColor = { Theme.COLORS.colorMainDark } />
            <ImageBackground
            source={require('../../assets/img/img-background.png')} 
            style={{ width: "100%", height: "100%", backgroundColor: Theme.COLORS.colorMainDark}}>
             
                <View style = {{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,.5)'
                }}>
                    <Formik
                    initialValues={{ 
                        username: '',
                        password: '',
                        isoculto:false
                    }}
                    onSubmit={(values, actions) => { LoginOnpress(values, actions)}}
                    validateOnChange = { true }
                    validationSchema={validationSchema}
                    >
                    {formikProps => (
                        <View style={{ 
                            flex:1,
                            alignItems:"center",
                            justifyContent:"center",
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
                                text = { "Iniciar sesión" }/>
                            </Animatable.View>
                            <View style = {{
                                paddingVertical: 8
                            }} />
                            <View style = {{
                                paddingVertical: 5
                            }}>
                                <Input nameicon = {"email"} borderWith = {0.3} 
                                borderRadius={35} alto = { height * 0.07 }
                                value = { formikProps.values.username }
                                ancho = { width * 0.8} borderColor = { 
                                    formikProps.errors.username && formikProps.touched.username ? Theme.COLORS.colorError :
                                    Theme.COLORS.colorSecondary
                                } marginBottom = { height * 0.007 }
                                
                                multiline = {false} autoCapitalize = "none" autoCorrect = {false}
                                editable = {true} keyboardType = "email-address" returnKeyType = "next"
                                placeholder = "Correo" placeholderTextColor = { Theme.COLORS.colorSecondary }
                                secureTextEntry = { false } onChangeText={ formikProps.handleChange('username') }
                                onFocus = {() => formikProps.setFieldTouched('username') }
                                onBlur={ formikProps.handleBlur('username') }
                                onclearText = { () => formikProps.setFieldValue('username', '')}    
                                />
                                { formikProps.errors.username && formikProps.touched.username ? (
                                    <View style = {{
                                        width: width * 0.8,
                                        position: "absolute",
                                        left: 5, top: height * 0.078
                                    }}>
                                        <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.xsmall } 
                                        color = { Theme.COLORS.colorError } fontFamily = { Theme.FONTS.LatoB }
                                        text = { formikProps.errors.username } textAlign = "left"  />
                                    </View> ) : null
                                } 
                            </View>
                            <View style = {{
                                paddingVertical: 5
                            }}>
                                <Input nameicon = {"lock"} borderWith = {0.3}
                                borderRadius={35} alto= { height * 0.07 }
                                value = { formikProps.values.password }
                                ancho = { width * 0.8} borderColor = { 
                                    formikProps.errors.password && formikProps.touched.password ? Theme.COLORS.colorError :
                                    Theme.COLORS.colorSecondary
                                } marginBottom = { height * 0.007 }
                                multiline = {false} autoCapitalize = "none" autoCorrect = {false}
                                editable = {true} keyboardType = "default" returnKeyType = "go"
                                isoculto={true}
                                placeholder = "Contraseña" placeholderTextColor = { Theme.COLORS.colorSecondary }
                                secureTextEntry = { formikProps.values.isoculto ? false :true } onChangeText={formikProps.handleChange('password')}
                                onFocus = {() => formikProps.setFieldTouched('password') }
                                onBlur={formikProps.handleBlur('password')}
                                onclearText = { () => formikProps.setFieldValue('password', '')}
                                onclearShowPassword = { () => {
                                    formikProps.setFieldValue('isoculto', !formikProps.values.isoculto)
                                }}/>
                                {formikProps.errors.password && formikProps.touched.password ? (
                                    <View style = {{
                                        width: width * 0.8,
                                        position: "absolute",
                                        left: 5, top: height * 0.078
                                    }}>
                                        <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                                        marginHorizontal = { 0 } fontSize = { Theme.SIZES.xsmall } 
                                        color = { Theme.COLORS.colorError } fontFamily = { Theme.FONTS.LatoB }
                                        text = { formikProps.errors.password } textAlign = "left"  />
                                    </View> ) : null
                                }
                            </View>
                            
                            <Button isloading = { loading } opacidad = {0.9} bicon = { true } 
                            nameicon = {"account"} 
                            text = 'INICIAR SESION' bborder = {true}  borderWidth = {1} 
                            borderColor = {Theme.COLORS.colorSecondary}
                            height = {hp("8%")} width = {wp("70%")}
                            colorfondo ={ Theme.COLORS.colorMainDark } 
                            marginTop = {25} marginBottom = {0} marginLeft = {0} marginRight = {0}
                            padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                            fontSize = { Theme.SIZES.normal }
                            onPress = { !loading ? formikProps.handleSubmit : null }/>

                            <TouchableOpacity 
                            onPress={ () => {  navigation.navigate("ResetPasswordScreen")}}
                            style = {{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                width: wp("90%"),
                                paddingVertical: 10,
                                marginTop:10
                            }}>
                                <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                                marginHorizontal = { 0 } fontSize = { Theme.SIZES.small} 
                                color = { Theme.COLORS.colorSecondary } fontFamily = { Theme.FONTS.Lato }
                                text = { "¿Olvidó su contraseña?"}/>
                            </TouchableOpacity>
                        </View> 
                    )}
                    </Formik>
                </View>
                <View style = {{
                    position: "absolute",
                    width: wp("100%"),
                    bottom: 10
                }}>
                    <Texto padding = { 0 } alignSelf = { "center" } marginVertical = { 0 }
                    marginHorizontal = { 0 } fontSize = { Theme.SIZES.xsmall } 
                    color = { Theme.COLORS.colorUnderline} fontFamily = { Theme.FONTS.LatoB }
                    text = { "Version " + VersionInfo.appVersion}/>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

export default Login