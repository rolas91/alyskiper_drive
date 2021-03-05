import React, {useEffect, useState } from 'react'
import { View, StatusBar, BackHandler, ActivityIndicator,ImageBackground} from 'react-native'
import TabV from '../components/TabV'
import Theme from '../utils/Style/Theme';
import AsyncStorage from '@react-native-community/async-storage'
import { setState } from 'expect/build/jestMatchersObject';

const InfoUsuario = (props) => {
    const [InfoUsuario, setInfoUsuario] = useState(null)
  

    const [infoTabs,setinfoTabs] =  useState({
        index: 0,
        routes: [
            { 
              key: 'tab1', title: "Usuario", iconname: "info"
            },
            { 
                key: 'tab2', title: "", iconname: ""
            },
        ],
    });
     
    const [state] = useState(infoTabs);


    useEffect(()=> {
        async function GetUser() {
            var x = await AsyncStorage.getItem('skiperStorage')
           
            setState(infoTabs)
         
        
           infoTabs.routes.map((details) => { 
               
            
            console.log(details.title)
            if(details.title===""){
                setInfoUsuario(JSON.parse(x).vehicle)
                switch(JSON.parse(x).vehicle.vehicleCatalog.id) {

                   
                    case 4:
                        details.iconname="directions-car"
                        details.title=JSON.parse(x).vehicle.vehicleCatalog.name
                        return true
                    case 4:
                        details.iconname="directions-car"
                        details.title=JSON.parse(x).vehicle.vehicleCatalog.name
                        return true
                    case 5:
                        details.iconname="directions-bike"
                        details.title=JSON.parse(x).vehicle.vehicleCatalog.name
                        return true   
                    case 6:
                            details.iconname="motorcycle"
                        details.title=JSON.parse(x).vehicle.vehicleCatalog.name
                        return true
                    case 8:
                            details.iconname="directions-walk"
                            details.title=JSON.parse(x).vehicle.vehicleCatalog.name
                            return true
                    default:
                    return
                  }

                
            
       
            }else{
            

            }
        });

        }
    
    
        GetUser()
    
    
      }, [])


    return(      
        <>
        {InfoUsuario ? (
            <ImageBackground 
            style={{ 
                flex:1,
                backgroundColor: Theme.COLORS.colorMainDark
            }}
            source= {require('../../assets/alycoin_bg.png')}> 
                <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,.5)'
                }}>
                    <TabV
                    lazy = { true }
                    index = { state.index }
                    routes = { state.routes }
                    idpestanas = { "tabsInfoUser" }
                    scrollEnabled = {true}
                    TabBarIndicatorbackgroundColor = {Theme.COLORS.colorSecondary}
                    TabBarbackgroundColor =  { Theme.COLORS.colorMainDark }
                    />
                </View>
            </ImageBackground>)
            : 
            <View
            style={{ 
                flex:1, 
                backgroundColor: Theme.COLORS.colorMainDark,
                justifyContent:"center"
            }}>
                <ActivityIndicator size="large" color= { Theme.COLORS.colorSecondary } />
            </View>
        }
      </>
     
    )
}

export default InfoUsuario