import { StyleSheet } from "react-native"
export default StyleSheet.create({
    all: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'darkgrey',
        height: 60,
        width: '100%',
        zIndex: 200,
        boxShadow: '0 0 10px darkgrey'
    }, 
    outBox: {
        display: 'flex',
        alignContent: 'stretch',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    icon: {
        borderRadius: 40,
        fontSize: 60,
        color: 'white',
        borderColor:'blue',
        backgroundColor: 'blue'
    },
    buttonIcon: {
        fontSize: 40
    },
    boxIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection:'column'
    }, 
    centralIconBox: {
        position: 'relative',
        top: -35,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 40,
        height: 80,
        boxShadow: '0 0 10px blue',

    }
})