import React from 'react';
import { View, Text } from 'react-native';
import Theme from '../utils/Style/Theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class TabItem extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style= {{
                justifyContent: "center", alignItems: "center",
                flexDirection: "row"
            }}>
                <Icon size = { 30 } color = { Theme.COLORS.colorSecondary }
                name = { this.props.iconname }/>
                <Text style = {{
                    paddingLeft: 5,
                    color : Theme.COLORS.colorParagraph,
                    fontFamily: Theme.FONTS.Lato, fontSize: Theme.SIZES.small
                }}
                numberOfLines={1} ellipsizeMode='tail'>
                    { this.props.texto }
                </Text>
            </View>
        )
    }
}