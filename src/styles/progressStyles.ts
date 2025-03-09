import { StyleSheet } from "react-native"

const progrssStyles = StyleSheet.create({
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
    textOnProgress: {
        position: 'relative',
        top: -50,
        left: 10,
        fontSize: 30
    }
})

export default progrssStyles