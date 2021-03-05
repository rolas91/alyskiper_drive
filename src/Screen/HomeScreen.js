import React, {Component} from 'react';

import Theme from '../utils/Style/Theme'
import {
Platform,
StyleSheet,
Text,
View,
Button,
Image,
ImageBackground,
TouchableOpacity,
Animated,
Dimensions,
Vibration,
StatusBar,
BackHandler,
Alert,
PermissionsAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE, Marker,AnimatedRegion } from 'react-native-maps';
import PubNubReact from "pubnub-react";
import Geolocation from 'react-native-geolocation-service'
import AsyncStorage from '@react-native-community/async-storage'
import { setState, setMatchers } from 'expect/build/jestMatchersObject';
import NetInfo from "@react-native-community/netinfo";

var { width, height } = Dimensions.get("window")


const ASPECT_RATIO = width / height;
const LATITUDE =12.106133;
const LONGITUDE = -86.248908;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HomeScreen extends React.Component<{}, State> {


  
  constructor(props){
    super(props);

    this.state = {
      value: true,
      toggle:true,
      isConnected: true,
      response: false,
      message:null,
      opacity1:1,
      permissionGPS:null, 
      categoriaDrive:null,
      online: true,
      alertsIsOn: true,
      newsletterIsOn: false,
      trackingIsOn: true,
      UserInfo:null };

       

     
    this.springValue = new Animated.Value(0.8);
    this.mensaje= this.mensaje.bind(this);
    this.pubnub = null
 }


  GetUser = async () => {
    var x = await AsyncStorage.getItem('skiperStorage')
    this.setState({UserInfo: JSON.parse(x)} )
    this.setState({categoriaDrive: JSON.parse(x).vehicle.skiperCatTravel.id})
    this.initPubNub()
  }
  
  initPubNub= () => {
    
    console.log("UUID: ESCOGIDO")
    console.log( this.state.UserInfo.firstname+this.state.UserInfo.userid);

    this.pubnub = new PubNubReact({
      publishKey: "pub-c-1271b42f-b90f-402d-99a8-749d0d2a13a7",
      subscribeKey: "sub-c-36cd6120-e9e6-11e9-bee7-82748ed6f7e5",
      uuid: this.state.UserInfo.firstname+this.state.UserInfo.userid
    });
    this.pubnub.init(this);
    console.log("INIT DEBUG----------")
    console.log(this.state.categoriaDrive)
    this.pubnub.addListener({
      status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
         
          var newState = {
            name: 'presence-tutorial-user',
            timestamp: new Date()
        };
        this.pubnub.setState(
            {
                channels: ["Drive"],
                state: newState
            }
        );
         

        }
        console.log("StatusEvent:")
        console.log(statusEvent)
      },
      message: function(message) {
        
      },
      presence: function(presenceEvent) {
        console.log("Viene Null")
          console.log(presenceEvent)
          console.log("Viene Null")
      }
    })
    console.log()
    console.log("Drive_"+this.state.categoriaDrive);

    this.pubnub.subscribe({ 
      channels: ["Drive"],
      withPresence: true
    });

}

mensaje= (messag1e) => {
  console.log("-----")
  console.log(messag1e.tipodeviaje)
  this.setState({message:messag1e})
  this.spring()

}


  noDisponibleOk= () => {

       this.setState({opacity1: 0.6 });
       this.setState({online:false})
       this.pubnub.unsubscribe(['enLinea']);
       this.setState({toggle:!this.state.toggle})
 

  }

  handleEmailChange = (email: boolean) => {
    let that = this;
    if(!this.state.toggle){
      this.setState({online: true });
      this.setState({opacity1: 1 });
      this.setState({toggle: !this.state.toggle });
     

    }else{

          Alert.alert(
            'Desconectarse',
            'Si te Desconectas, no recibiras Nuevas Peticiones de Viajes, ¿desea continuar?',
            [
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {   that.setState({toggle:!toggle})} },
            ],
            { cancelable: false }
          )

    }

  };
  OnlineButtonClick = (email: boolean) => {
    this.props.navigation.navigate("PubNubTest",{s:{objetos: this.state.UserInfo}, m:{detallesviaje:this.state.message}})
                             
                        
  };

  watchLocation = () => {
    let that = this;
      const { coordinate } = this.state;
      this.watchID = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const newCoordinate = {
            latitude: latitude,
            longitude: longitude
          };
       



          if(this.state.toggle){

  
        this.pubnub.setState(
            {
                state: {
                  "categoria":"1",
                  "coords":newCoordinate,
                  "firstname":this.state.UserInfo.firstname,
                  "lastname" :this.state.UserInfo.lastname,   
                 
                },
                uuid: this.state.UserInfo.firstname+this.state.UserInfo.userid,
                channels: ["Drive"]
            },
            function (status) {
             console.log("LOcalizacion enviada a Pubnub")
              console.log(status)
             
            }
        );
          
      }

          this.setState({
            latitude,
            longitude
          });
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 0
        }
      );
    };

  requestAccess = async () => {
       try {
        let that = this;
         const granted = await PermissionsAndroid.request(
           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
           {
             'title': 'Acceso a localizacion',
             'message': 'La aplicacion necesita este permiso' +
                        'para que podamos enviar tu localizacion.'
           }
         )


         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           setState({permissionGPS:granted})
          Geolocation.getCurrentPosition(
             (position) => {
               this.setState({
                 latitude: position.coords.latitude,
                 longitude: position.coords.longitude,
                 error: null,
               });
               const { latitude, longitude } = position.coords;

               const newCoordinate = {
                latitude:latitude,
                longitude: longitude
              };
              setState({permissionGPS:granted})

              if(this.pubnub!==null && this.state.categoriaDrive!==null ){
   
              this.pubnub.setState(
                {
                    state: {
                      "categoria":"1",
                      "coords":newCoordinate,
                      "firstname":that.state.UserInfo.firstname,
                      "lastname" :that.state.UserInfo.lastname,   
                     
                    },
                    uuid: this.state.UserInfo.firstname+this.state.UserInfo.userid,
                    channels: ["Drive"]
                },
                function (status) {
                //  console.log("LOcalizacion enviada a Pubnub")
                //console.log(status)
               
                }
            );
          }
    
             },
             (error) => this.setState({ permissionGPS: error.message }),
             { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
           );

         } else {

          setState({permissionGPS:granted})

          this.props.navigation.navigate("FailedPermission",{s:{objetos: this.state.UserInfo}, m:{detallesviaje:this.state.message}})
                             
                             
         }
       } catch (err) {
         console.warn(err+"lllllllll")
       }
     };

  componentDidUpdate() {
   
    console.log(this.state.permissionGPS)
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    //this.pubnub.unsubscribe({ channels: ["Drive_"+this.state.categoriaDrive] });
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };
  

  componentDidMount () {
    console.log("Entro al didmount")
    this.GetUser()
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    
    this.requestAccess();
    this.watchLocation();
   
    let that= this;

  }
  
  componentWillMount() {


  }
  

  spring () {

    if(this.state.online===true ){
              this.springValue.setValue(2);



            Animated.sequence([
              Animated.timing(this.springValue, {
                toValue: 0.2,
                duration: 500,
                delay: 100
              }),
              Animated.timing(this.springValue, {
                toValue: 0.8,
                duration: 100
             })
            ]).start(event => {
              if (event.finished) {
              this.spring()
              }
              });
        }else{

        }
      }

  render() {


 if (!this.state.isConnected) {
  alert("Hola")
}

    return (


          <ImageBackground
                  style={{ flex: 1, backgroundColor:'#000018' }}
                  source={require('../../assets/img/ImagenesGenerales/img-background.png')}>
                          <StatusBar barStyle="light-content" backgroundColor = '#000018'  />
           
                          <View style={styles.container}>

                          <View style={styles.tituloContainer}>
                          <Image resizeMode="contain"  source= {require('../../assets/img/ImagenesGenerales/Skip.png')} style={styles.tituloImg}/>

                          

                          </View>

                          <View style={styles.logoContainer}>


                          <TouchableOpacity    onPress={() => {

                            
                            console.log(this.state.message)
                              
                            if(this.state.message!==null){
                              console.log(this.state.message)
                              var tipo=this.state.message.message.tipodeviaje;
                             
                              this.springValue.stopAnimation() 

                              
                              
                              if(tipo===1){
                                this.springValue.stopAnimation()
                                this.springValue.setValue(1);
                                
                              
                              this.props.navigation.navigate("Viaje",{s:{objetos: this.state.UserInfo}, m:{detallesviaje:this.state.message}})
                              this.setState({message:null})
                              }else if(tipo===2){
                                this.springValue.stopAnimation()
                                this.springValue.setValue(1);
                              
                            
                              this.props.navigation.navigate("ViajeDelivery", {s:{objetos: this.state.UserInfo}, m:{detallesviaje:this.state.message.message}})
                              this.setState({message:null})
                              }
                            
                            }
                          
                           }}>
                          <Animated.Image
                          style={{   height: height * 0.8,
                          width: width * 0.5,
                          transform: [{scale: this.springValue}],
                          opacity: this.state.opacity1}}
                          source= {require('../../assets/img/ImagenesGenerales/Canguro_vector.png')}  resizeMode="contain"/>
                          </TouchableOpacity>
                          </View>

                          <View style={styles.onlineImgContainer}>

                          <TouchableOpacity onPress={this.OnlineButtonClick} style={styles.buttonOnline}>

                          {this.state.toggle?
                           <Image source={require('../../assets/img/ImagenesGenerales/Skiper_Online.png')}  resizeMode="contain" style={styles.onlineImg}/>
                           :
                           <Image source={require('../../assets/img/ImagenesGenerales/Skiper_Offline.png')}  resizeMode="contain"  style={styles.onlineImg}/>
                          }
                          </TouchableOpacity>
                          </View>


                    {/* }  <MaterialCard12 style={styles.materialCard12} /> */}
                  </View>
          </ImageBackground>
);
}
}
const styles = StyleSheet.create({
  container: {
  flex:1,
  marginTop: 30,
  },
  logoContainer:{

    flex:2,
  /*   backgroundColor: 'pink',*/
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
      opacity: .4,

            height: height,
            width: width,
  },

  tituloContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloImg:{
      height:  height * 0.9,
      width: width *0.9,
  },


  onlineImgContainer:{

    flex:0,
    marginRight: 40,
    alignItems: 'flex-end',
    marginBottom: 30
  },
  onlineImg  :{

        height: height * 0.2,
        width: width * 0.2,

    },



  materialCard12: {
    marginTop: 100,
    width: 316.56,
    height: 208.36,
    position: "absolute"
  },

headerText: {
fontSize: 20,
textAlign: 'center',
margin: 10,
fontWeight: 'bold'
},

row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonOnline: {

      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 50, width: 50 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 20, //IOS
      backgroundColor: '#29EEDF',
      elevation: 100, // Android
      height:height * 0.13,
      width: height * 0.13,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: width * 0.13,

  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 100,
    backgroundColor: 'transparent'
  },
  box_text: {
    color: 'transparent'
  }
});
export default HomeScreen;
