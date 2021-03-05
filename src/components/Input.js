import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
  } from 'react-native';
import Theme from '../utils/Style/Theme.js';
import Icon from 'react-native-vector-icons/MaterialIcons'
var {height, width} = Dimensions.get('window');
export default class Input extends React.Component {

    constructor(props){
       super(props);
    }
    
    render(){
        return(
            <View style={{
                backgroundColor: Theme.COLORS.colorMainDark,
                borderWidth: this.props.borderWith,
                borderColor: this.props.borderColor,
                borderRadius: this.props.borderRadius,
                alignItems: 'center',
                flexDirection: 'row',
                height: this.props.alto,
                width: this.props.ancho,
                marginBottom: this.props.marginBottom
            }}>
                <Icon name={this.props.nameicon} size={20} 
                style= {{
                    marginLeft: 15,
                    color:Theme.COLORS.colorSecondary
                }} />
                <View style = {{
                    marginLeft: 10,
                    marginRight:10,
                    width: this.props.isoculto ? width * 0.46: width * 0.55,
                }}>
                    <TextInput style = {{
                        color: Theme.COLORS.colorSecondary,
                        fontSize: Theme.SIZES.xsmall,
                        fontFamily: "Lato-Regular",
                        alignContent: 'stretch',
                        ...Platform.select({
                            ios:{
                                borderColor: colors.SILVER,
                                borderBottomWidth: StyleSheet.hairlineWidth
                            },
                            android: {
                                paddingLeft:6
                            }
                        })
                    }}
                    selectTextOnFocus = { true }
                    selectionColor = { Theme.COLORS.colorParagraph }
                    value = { this.props.value }
                    multiline={ this.props.multiline }
                    autoCapitalize={ this.props.autoCapitalize }
                    autoCorrect={ this.props.autoCorrect }
                    editable = { this.props.editable }
                    keyboardType={ this.props.keyboardType } 
                    returnKeyType= { this.props.returnKeyType }
                    placeholder={ this.props.placeholder }
                    onFocus = { this.props.onFocus }
                    placeholderTextColor= { this.props.placeholderTextColor }
                    secureTextEntry  = { this.props.secureTextEntry }
                    onChangeText={ this.props.onChangeText }
                    onBlur={ this.props.onBlur }
                    />
                </View>
                { this.props.value ? (     
                    <View style = {{
                        flexDirection: "row"
                    }}>
                        {this.props.isoculto ?
                                <TouchableOpacity onPressIn = { this.props.onclearShowPassword } 
                                onPressOut = { this.props.onclearShowPassword }>
                                    <Icon name= 'remove-red-eye' size={20}
                                    style= {{
                                       
                                        color:Theme.COLORS.colorSecondary
                                    }} />  
                                </TouchableOpacity>
                        : null}
                        <TouchableOpacity style = {{
                            paddingLeft: this.props.isoculto ? 10: 0
                        }}  onPress = { this.props.onclearText }
                     >
                            <Icon name= 'cancel' size={20}
                            style= {{
                                color:Theme.COLORS.colorSecondary
                            }} />  
                        </TouchableOpacity>
                    </View>  
            ) : null }                       
            </View>
        )
    }

}