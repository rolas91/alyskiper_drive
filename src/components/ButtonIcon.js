import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const  Buttonicon = (props) => {

    return (
        <TouchableOpacity style={ props.style ||  style(props).button  } onPress = {props.onPress }>
            <Icon size = { props.iconsize } color = { props.iconcolor }
            name = { props.iconname }/>
        </TouchableOpacity>
    )
}

const style = (props) => StyleSheet.create({
    button: {
        padding: props.padding, 
        backgroundColor: props.backgroundColor, 
        borderRadius: props.borderRadius,
        opacity: props.opacity
    }
})

export default Buttonicon