import React from 'react';
import Home from '../Screen/Home'
import HomeScreen from '../Screen/Home'
import TitleHeader from '../components/TitleHeader';
import Theme from '../utils/Style/Theme';
import { Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import SideMenu from '../components/SideMenu'
import Viaje from '../Screen/Viaje'
import Ganancias from '../Screen/Ganancias'
import CodigoViaje from '../Screen/CodigoViaje'
import HistorialDeViaje from '../Screen/HistorialDeViajes'
import InfoUsuario from '../Screen/InfoUsuario'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ViajeFinalizado from '../Screen/ViajeFinalizado';
import Wallets from '../Screen/wallets';
var {height, width} = Dimensions.get('window');
const HomeStack = createStackNavigator(
  {   
    Ganancias: {
      screen: Ganancias,
      navigationOptions: {
        headerLeft: <TitleHeader bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        },
      }
    },
    Home: {
        screen: Home,
        navigationOptions: {
          headerLeft: <TitleHeader bbusqueda = {false} bmenu = {true}/>,
          headerStyle: {
            backgroundColor: Theme.COLORS.colorMainDark,
            height: hp("10%")
          },
        }
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: <TitleHeader bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        },
      }
    },
    CodigoViaje: {
      screen: CodigoViaje,
      navigationOptions: {
        headerLeft: <TitleHeader bbusqueda = {false} bmenu = {false}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        },
      }
    },
    Ganancias: {
      screen: Ganancias,
      navigationOptions: {
        headerLeft: <TitleHeader bback={true} bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: height * 0.10
        }
      }
    },
    Viaje: {
      screen: Viaje,
      navigationOptions: {
        headerLeft: <TitleHeader bbusqueda = {false} bmenu = {false}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        },
      }
    },
    HistorialDeViaje: {
      screen: HistorialDeViaje,
      navigationOptions: {
        headerLeft: <TitleHeader bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        },
      }
    },
    InfoUsuario: {
      screen: InfoUsuario,
      navigationOptions: {
        headerLeft: <TitleHeader bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        },
      }
    },
    ViajeFinalizado: {
      screen: ViajeFinalizado,
      navigationOptions: {
        headerLeft: <TitleHeader bbusqueda = {false} bmenu = { false }/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        },
      }
    },
    Home: {
        screen: Home,
        navigationOptions: {
          headerLeft: <TitleHeader bbusqueda = {false} bmenu = {true}/>,
          headerStyle: {
            backgroundColor: Theme.COLORS.colorMainDark,
            height: height * 0.10
          },
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
          headerLeft: <TitleHeader bbusqueda = {false} bmenu = {true}/>,
          headerStyle: {
            backgroundColor: Theme.COLORS.colorMainDark,
            height: height * 0.10
          },
        }
    },
    CodigoViaje: {
      screen: CodigoViaje,
      navigationOptions: {
        headerLeft: <TitleHeader bback = { true } bbusqueda = {false} bmenu = {false}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: height * 0.10
        },
      }
    },
    Viaje: {
      screen: Viaje,
      navigationOptions: {
        headerLeft: <TitleHeader bback = { true } bbusqueda = {false} bmenu = {false}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: height * 0.10
        },
      }
    },
    HistorialDeViaje: {
      screen: HistorialDeViaje,
      navigationOptions: {
        headerLeft: <TitleHeader bback={true} bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: height * 0.10
        },
      }
    },
    InfoUsuario: {
      screen: InfoUsuario,
      navigationOptions: {
        headerLeft: <TitleHeader bback={true} bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: height * 0.10
        }
      }
    },
    Wallets: {
      screen: Wallets,
      navigationOptions: {
        headerLeft: <TitleHeader bback={true} bbusqueda = {false} bmenu = {true}/>,
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainDark,
          height: hp("10%")
        }
      }
    }
    },
    {
      initialRouteName: "Home"
    }
)

var DrawerStack = createDrawerNavigator({
  Home: HomeStack
}, {
  contentComponent: SideMenu,
  drawerWidth: wp("70%"),
  drawerType: 'back'
})

const InicioStack = createAppContainer(DrawerStack);

export default InicioStack
