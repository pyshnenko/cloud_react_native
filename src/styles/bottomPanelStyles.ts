import { StyleSheet } from "react-native"
import colors from "./colors"
export default StyleSheet.create({
    all: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: colors.bottom,
        height: 60,
        width: '100%',
        zIndex: 200,
        boxShadow: '0 0 10px colors.bottom'
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
        color: colors.bottomBoxIcon,
        borderColor:colors.centralBottomIcon,
        backgroundColor: colors.centralBottomIcon
    },
    buttonIcon: {
        fontSize: 40,
        color: colors.bottomCentralIcon
    },
    boxIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection:'column',
        position: 'relative',
        top: -10
    }, 
    centralIconBox: {
        position: 'relative',
        top: -35,
        backgroundColor: colors.centralBottomIcon,
        padding: 10,
        borderRadius: 40,
        height: 80,
        boxShadow: `0 0 10px ${colors.centralBottomIcon}`,

    }
})