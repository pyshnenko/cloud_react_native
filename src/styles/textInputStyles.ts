import { StyleSheet } from "react-native"
const textInputStyle = StyleSheet.create({
    all: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:'column',
        zIndex: 100
    },
    back: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        opacity: 0.85,
        zIndex: 101
    },
    elem: {
        zIndex: 102,
        alignItems: 'stretch',
        width: '80%',
    },
    buttonsBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        minWidth: 200,
        margin: 8
    },
    button: {
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        
    }
})

export default textInputStyle