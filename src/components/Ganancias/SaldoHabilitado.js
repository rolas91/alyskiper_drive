import React, { useEffect } from 'react'
import { View } from 'react-native'
import Texto from '../Texto'
import Theme from '../../utils/Style/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getSaldoHabilitado } from '../../graphql/query/SaldoHabilitado'
import { useQuery } from '@apollo/react-hooks'

const SaldoHabilitado = props => {

    const { loading, error, data } = useQuery(getSaldoHabilitado, {
        variables: {
            id: props.idwallet
        },
        pollInterval: 1000
    })

    useEffect(() => {
        if(error)
            props.navigation.navigate("Pageerror", {
                error: error.graphQLErrors[0].message
            })
    }, [error])

    return(
        <>
            {data 
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
                    borderColor: 'rgba(28,117,227,0.98)'}}>
                        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems: 'center',
                        marginRight: 10, marginLeft: 10,marginBottom:10}}>
                            <Icon name='wallet' size={50} color="rgba(28,117,227,0.98)"/>
                            <View style = {{
                            height: 100,
                            width: 3,
                            backgroundColor: 'rgba(28,117,227,0.98)'}}/>
                            <View style={{ width: '60%', }}>
                                <Texto alignSelf = { "flex-start" } justifyContent={"flex-start"} marginVertical = { 0 }
                                marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                                color = { 'rgba(28,117,227,0.98)' } fontFamily = { Theme.FONTS.LatoB }
                                text = "Saldo Habilitado" />    
                                <Texto alignSelf = { "flex-start" } justifyContent={"flex-start"} marginVertical = { 0 }
                                marginHorizontal = { 0 } fontSize = { Theme.SIZES.subTitle } 
                                color = { 'white' } fontFamily = { Theme.FONTS.LatoB }
                                text = { data.searchSkiperWallet.amount - data.searchSkiperWallet.minimun } />
                                {/* se comenta esto porque de momento esta funcionalidad no se realizara */}
                                {/* <Button opacidad = {0.6} bicon = { false } text = 'Retirar'
                                bborder = {true}  borderWidth = {5} borderColor = {Theme.COLORS.colorUnderline}
                                height = {wp("12%")} width = "80%"
                                colorfondo ={ Theme.COLORS.colorMainDark } 
                                marginTop = {5} marginBottom = {0} marginLeft = {0} marginRight = {0}
                                padding = {0} borderRadius = {35} textcolor = { Theme.COLORS.colorParagraph }
                                fontSize = { Theme.SIZES.small }
                                marginLeft={10}
                                onPress = {() => {
                                
                                }}/>  */}
                            </View>
                        </View>
                    </View>
                :
                    null
            }
        </>
    )
}

export default SaldoHabilitado