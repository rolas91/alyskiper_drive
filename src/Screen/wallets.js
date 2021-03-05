import React, {useEffect} from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { LLENARWALLETS, CLEARWALLETS } from '../Reducer/ActionTypes'
import { ImageBackground, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Theme from '../utils/Style/Theme'
import { GetUserWallets } from '../graphql/query/GetUserWallets'
import TextoDosColumna from '../components/TextoDosColumna'
import Texto from '../components/Texto'
import jwdecode from 'jwt-decode'

const Wallets = props => {

    const usuario = useSelector(x => x.Usuario)
    const wallets = useSelector(x => x.wallets)
    const dispatch = useDispatch()

    const { loading, error, data, refetch } = useQuery(GetUserWallets, {
        variables: {
            id: jwdecode(usuario.token).sub
        }
    })

    useEffect(() => {
        if(error)
            props.navigation.navigate("Pageerror", {
                error: error.graphQLErrors[0].message
            })
        if(data)
            dispatch({ type: LLENARWALLETS, payload: data.GetUserWallets })
        
        return(() => {
            dispatch({ type: CLEARWALLETS })
        })
    }, [error, data])

    return (
        <ImageBackground 
        style={{   
            width: wp("100%"),
            height: hp("100%"),
            backgroundColor: Theme.COLORS.colorMainDark
        }} source= {require('../../assets/alycoin_bg.png')}>
            <View style = {{
                flex: 1,
                backgroundColor: "rgba(0,0,0,.5)"
            }}>
                <Texto padding = { 15 } alignSelf = { "center" } marginVertical = { 0 }
                marginHorizontal = { 0 } fontSize = { Theme.SIZES.title } 
                color = { Theme.COLORS.colorParagraph } fontFamily = { Theme.FONTS.LatoB }
                text = { "Wallets" } />
                { wallets 
                    ? 
                        <FlatList
                        data={ wallets.skiperWallet }
                        refreshControl = {
                            <RefreshControl progressBackgroundColor = { Theme.COLORS.colorSecondary } 
                            refreshing = {loading} onRefresh = { () => {
                                refetch()
                            }} />
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity style = {{
                                backgroundColor: Theme.COLORS.colorMain,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                marginHorizontal: 5,
                                marginVertical: 2
                            }} onPress = {() => {
                                props.navigation.navigate("Ganancias", {
                                    wallet: item
                                })
                            }}>
                                <TextoDosColumna textfirtscolumn = { "ID:" } 
                                textsecondcolumn = { item.id }/>
                                <TextoDosColumna textfirtscolumn = { "Moneda:" } 
                                textsecondcolumn = { item.currencyID.name }/>
                                <TextoDosColumna textfirtscolumn = { "Saldo:" } 
                                textsecondcolumn = { item.amount }/>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}/>
                    : 
                        <View style = {{
                            flex: 1,
                            height: hp("100%"),
                            width: wp("100%"),
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: Theme.COLORS.colorMainDark
                        }}>
                            <Texto padding={10} alignSelf={"center"} marginVertical={0}
                            marginHorizontal={0} fontSize={Theme.SIZES.normal}
                            color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
                            text={ "No tienes wallets registradas" } />
                        </View>
                }
            </View>
        </ImageBackground>
    )
}

export default Wallets