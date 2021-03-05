import React from 'react';
import { Image, Dimensions, View, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import Theme from '../utils/Style/Theme';
import Input from './Input'
import { withNavigation } from 'react-navigation'

var {height, width} = Dimensions.get('window');

class TitleHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bbuscar: false,
        }
    }

    render(){
        return(
            this.state.bbuscar == false ? (
                <View style = {{
                    flexDirection: "row"
                }} >

                    {this.props.bback ? (
                        <TouchableOpacity activeOpacity = {0.6} style = {{
                            padding: 5, margin: 2,
                            alignItems: "center", justifyContent: "center"
                        }} onPress = {() => {
                            this.props.navigation.goBack()
                        }}>
                            <Icon name ="arrow-back" size = {25} color = {Theme.COLORS.colorSecondary}/>
                        </TouchableOpacity>
                    ) : null }    

                    <View>
                        
                        <Image source = {require('../../assets/img/ImagenesGenerales/logotext.png')}
                        style= {{ 
                            paddingLeft:0, height: height * 0.10, width: width * 0.4
                        }} resizeMode = "contain">
                        </Image>
                    </View>
                    <View style = {{
                       width: this.props.bback  ? width * 0.5 : width * 0.6,
                        flexDirection: "row-reverse",
                        alignItems: "center", justifyContent: "flex-start"
                    }}>
             
                        
                        {this.props.bbusqueda ? (
                            <TouchableOpacity activeOpacity = {0.6} style = {{
                                backgroundColor: Theme.COLORS.colorMainDark,
                                padding: 5, margin: 2
                            }} onPress = {()=> { this.setState({ bbuscar: !this.state.bbuscar }) }}>
                                <Icon name ="search" size = {25} color = {Theme.COLORS.colorSecondary}/>
                            </TouchableOpacity>
                        ) : null }
                        {this.props.bmenu ? (
                            <TouchableOpacity activeOpacity = {0.6} style = {{
                                backgroundColor: Theme.COLORS.colorMainDark,
                                padding: 5, margin: 2
                            }} onPress = {() => {
                                this.props.navigation.toggleDrawer();
                            }}>
                                <Icon name ="menu" size = {25} color = {Theme.COLORS.colorSecondary}/>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            ) :  (
                <View style = {{
                    flexDirection: "row"
                }} >
                    <View style = {{
                        width: width * 0.2,
                        flexDirection: "row-reverse",
                        alignItems: "center", justifyContent: "flex-start"
                    }}>
                        <TouchableOpacity activeOpacity = {0.6} style = {{
                            backgroundColor: Theme.COLORS.colorMainDark,
                            padding: 5, margin: 2, alignItems: "center", justifyContent: "center"
                        }} onPress = {()=> { this.setState({ bbuscar: !this.state.bbuscar }) }}>
                            <Icon name ="keyboard-arrow-left" size = {25} color = {Theme.COLORS.colorSecondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{
                        width: width * 0.8,
                        alignItems: "center", justifyContent: "center"
                    }}>
                        <Input borderWith = {0.3} borderRadius={35} alto = {40}
                        ancho = "100%" bmarginTop = { false } error = ""
                        multiline = {false} autoCapitalize = "none" autoCorrect = {false}
                        editable = {true} keyboardType = "default" returnKeyType = "go"
                        placeholder = "Buscar..." placeholderTextColor = { Theme.COLORS.colorSecondary }
                        secureTextEntry = { false } onChangeText={()=> {}}
                        onBlur={() => {}}/>
                    </View>
                </View>
            )
        );
    }
}

export default withNavigation(TitleHeader)