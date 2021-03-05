import React, { useEffect } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Texto from '../Texto'
import Theme from '../../utils/Style/Theme'
import { useQuery } from '@apollo/react-hooks'
import { Ganancias } from '../../graphql/query/Ganancias'
import { useSelector } from 'react-redux'

const GananciasDelDia = props => {

    const position = useSelector(x => x.Position)

    const { loading, error, data } = useQuery(Ganancias, {
        variables: {
            idwallet: props.idwallet,
            lat: position.latitude,
            lng: position.longitude,
            flat: !props.bgananciastotales
        },
        pollInterval: 1000,
        onError: (error) => {
            props.navigation.navigate("Pageerror", {
                error: error.graphQLErrors[0].message
            })
        }
    })

    useEffect(() => {
        if(error)
            props.navigation.navigate("Pageerror", {
                error: error.graphQLErrors[0].message
            })
    }, [error])

    return(
        <>
        { data 
            ? 
                <View style = { Theme.MainContainer, {
                    marginRight:10,
                    marginLeft:10,
                    marginTop:10,
                    paddingTop:10,
                    paddingBottom:10,
                    backgroundColor:Theme.COLORS.colorMainDark,
                    borderRadius:20,
                    borderWidth: 1,
                    opacity: .7,
                    borderColor: 'rgba(28,117,227,0.98)'
                }}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems: 'center',
                    marginRight: 10, marginLeft: 5,marginBottom:10}}>
                        <Icon name='cash' size={50} color="rgba(28,117,227,0.98)"/>
                        <View
                        style = {{
                            height: 100,
                            width: 3,
                            backgroundColor: Theme.COLORS.colorUnderline
                        }}/>
                        <View style={{ width: '60%', }}>
                                <Texto alignSelf = { "flex-start" } justifyContent={"flex-start"} marginVertical = { 0 }
                                marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                                color = { 'rgba(28,117,227,0.98)' } fontFamily = { Theme.FONTS.LatoB }
                                text = { props.titulo } />    
                                <Texto alignSelf = { "flex-start" } justifyContent={"flex-start"} marginVertical = { 0 }
                                marginHorizontal = { 0 } fontSize = { Theme.SIZES.normal } 
                                color = { 'white' } fontFamily = { Theme.FONTS.LatoB }
                                text = { data.getGanaciaDelDia.ganancia } />  
                                <Texto alignSelf = { "flex-start" } justifyContent={"flex-start"} marginVertical = { 0 }
                                marginHorizontal = { 0 } fontSize = { Theme.SIZES.small } 
                                color = { 'white' } fontFamily = { Theme.FONTS.LatoB }
                                text = { "Viajes: " + data.getGanaciaDelDia.viajes } />  
                            </View>
                    </View>
                </View>   
            :
                null}
        </>
        
    )
}

export default GananciasDelDia