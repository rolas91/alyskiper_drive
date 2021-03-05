import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import LabelVertical from '../components/LabelVertical'
import Theme from '../utils/Style/Theme'
import Imagen from '../components/Imagen'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { useMutation } from '@apollo/react-hooks'
import { Updateavatar as update} from '../graphql/mutations/UpdateAvatar'
import jwtdecode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
import { UPDATEAVATAR } from '../Reducer/ActionTypes'

const PerfilUsuario = () => {

    const usuario = useSelector(x => x.Usuario)
    const [Updateavatar, { loading , data, error  }] = useMutation(update)
    const [LoadingAvatar, setLoadingAvatar] = useState(false)
    const dispatch = new useDispatch()

    useEffect(() => {
      if(data)
        dispatch({ type: UPDATEAVATAR, payload: data.updateUser.avatar })
      
      if(error)
        props.navigation.navigate("Pageerror", {
          error: errorRegion.message
        })
    }, [data, error])

    var options = {
        title: 'Seleccionar imagen',
        takePhotoButtonTitle: 'Tomar foto', 
        cancelButtonTitle: 'Cancelar', 
        chooseFromLibraryButtonTitle: 'Seleccionar de la galeria',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
    };

    const selectfoto = () => {
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton)
            } else {
              let source = response;
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              //vamos a subir la foto al google cloud
              const image = {
                uri: response.uri,
                type: 'image/jpeg',
                name: 'myImage' + '-' + Date.now() + '.jpg'
              }

              const imgBody = new FormData();
              imgBody.append('image', image);
              setLoadingAvatar(true)
              const url = `https://backend-subir-imagenes.herokuapp.com/upload`;
              fetch(url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
                body: imgBody
                }).then(res => res.json()).then(results => {
                  setLoadingAvatar(false)
                  // Just me assigning the image url to be seen in the view
                  const s = { uri: results[0].path, isStatic: true };
                  Updateavatar({ variables: { input: { id: jwtdecode(usuario.token).sub, avatar: s.uri } } })
              }).catch(error => {
                setLoadingAvatar(false)
                props.navigation.navigate("Pageerror", {
                  error: error.message
                })
              });
            }
        });
    }

    return(
        <View style= { 
            Theme.MainContainer, { height: hp("100%"), width: wp("100%"), 
        }}>
            <Imagen loading = { LoadingAvatar || loading } ContenedorborderRadius = { (hp("20%")) / 2 } width = { hp("20%") } 
            height = { hp("20%") } padding = { 5 } borderColor = { Theme.COLORS.colorSecondary }
            borderWidth = { 1 } ImageborderRadius = { ( hp("19%") ) / 2 } widthImage = { hp("19%") }
            heightImage = { hp("19%") } marginVertical = { 30 } marginHorizontal = { 0 }
            topButton = { hp("13%") } LeftButton = { hp("12%") } buttonicon = { true } 
            ButtoniconOnpress = {() => selectfoto() } source = {{ uri: usuario.avatar }}/>

            <ScrollView style = {{
                paddingHorizontal: 10
            }}>
                <LabelVertical 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                text = { "Nombre" } value = { usuario.firstname + " " + usuario.lastname  }/>

                <View style = {{ paddingVertical: 5 }}/>

                <LabelVertical 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                text = { "Nombre de usuario" } value = { usuario.username }/>

                <View style = {{ paddingVertical: 5 }}/>
                
                <LabelVertical 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                text = { "Correo electronico" } value = { usuario.email }/>

                <View style = {{ paddingVertical: 5 }}/>

                <LabelVertical 
                LabelSize = { Theme.SIZES.small } LabelColor = { Theme.COLORS.colorSecondary }
                ValueSize = { Theme.SIZES.normal } ValueColor = { Theme.COLORS.colorParagraph }
                text = { "No. telefono" } value = { usuario.phone_number  }/>

            </ScrollView>

        </View>
    )
}

export default PerfilUsuario