
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import Navigation from './src/navigation'
import { ApolloClient, split, HttpLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import AsyncStorage from '@react-native-community/async-storage'
import { store } from './src/Storage/index'
import { Provider } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import NetInfo from '@react-native-community/netinfo'
import { View, Image } from 'react-native'
import Texto from './src/components/Texto'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Theme from './src/utils/Style/Theme'
import GPSState from 'react-native-gps-state'

const httpLink = new HttpLink({
  uri: "https://backend-alyskiper.herokuapp.com/graphql"
});

const wsLink = new WebSocketLink({
  uri: 'https://backend-alyskiper.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const authLink =  setContext( async (_, { headers }) => {

  var x = await AsyncStorage.getItem('skiperStorage')
  return {
    headers: {
      ...headers,
      authorization: x ? `Bearer ${ JSON.parse(x).token }` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default function App() {
  
  const [isConnected, setIsConnected] = useState(true)
  const [gpsIsConnected, setGpsIsConnected] = useState(true)
  const [gpsMessage, setGpsMessage] = useState("")

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    })

    GPSState.addListener((status)=>{
      switch(status){
          case GPSState.NOT_DETERMINED:{
            setGpsMessage("Por favor, permita la ubicación, ¡para que podamos hacer cosas increíbles por usted!")
            setGpsIsConnected(false)
            break;
          }
          case GPSState.RESTRICTED:
          {
            setGpsMessage("Activa tu gps")
            // GPSState.openLocationSettings()
            setGpsIsConnected(false)
            break;
          }
          case GPSState.DENIED:
          {
            setGpsMessage("Es una pena que no nos permitas usar la ubicación :(")
            setGpsIsConnected(false)
            break;
          }
          case GPSState.AUTHORIZED_ALWAYS:
          {
            setGpsIsConnected(true)
            break;
          } 
          case GPSState.AUTHORIZED_WHENINUSE:
          {
            setGpsIsConnected(true)
            break;
          }
      }
    })
    GPSState.requestAuthorization(GPSState.AUTHORIZED_ALWAYS)

    return () => {
      unsubscribe()
      GPSState.removeListener()
    }
  }, [setIsConnected, setGpsIsConnected, setGpsMessage])

  return (
    <Provider store={ store }>
      <ApolloProvider client={client}>
      {isConnected && gpsIsConnected ? (
          <>
            <Navigation />
            <FlashMessage position="top" />
          </>
        ) : (
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
            }} source = {require('./assets/img/error.png')}/>
            <Texto padding={10} alignSelf={"center"} marginVertical={0}
            marginHorizontal={0} fontSize={Theme.SIZES.normal}
            color={Theme.COLORS.colorSecondary} fontFamily={Theme.FONTS.LatoB}
            text={ gpsMessage != "" ? gpsMessage : "No estas conectado a internet" } />
          </View>
        )}
      </ApolloProvider>
    </Provider>
  );
};