import { RFValue } from "react-native-responsive-fontsize"

const Theme = {
    MainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    MainContainer2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    FONTS:{
        Lato: "Lato-Regular",
        LatoB: "Lato-Bold"

    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:30,
        borderColor: '#03F9FC',
        borderWidth: 1,
        backgroundColor: 'red',
        right: 20,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        backgroundColor: "white"
    },
    COLORS:{
     colorMain: '#000024',
     colorMainDark: '#000018',
     colorSecondary: '#03F9FC',
     colorParagraph: '#E4E4E4',
     colorParagraphSecondary: '#C9C9C9',
     colorUnderline:'rgba(28,117,227,0.98)',
     colorInput:'',
     colorTextError: 'red',
     colorSucces: '#097302',
     colorInfo:'#018FB3',
     colorWarning: '#fdbe00',
     colorError: 'red',
     colorErrorTransparent: 'rgba(191,5,30, .6)'
    },
    SIZES:{
        h1: RFValue(32),
        title: RFValue(28),
        subTitle: RFValue(23),
        normal: RFValue(20),
        small: RFValue(17),
        xsmall: RFValue(14)
    }
};

export default Theme;