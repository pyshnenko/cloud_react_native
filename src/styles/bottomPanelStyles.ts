import { StyleSheet } from "react-native"
import colors from "./colors"
export default StyleSheet.create({
    all: {
        position: 'absolute',
        left: 0,
        backgroundColor: colors.white.bottom,
        height: 50,
        width: '100%',
        zIndex: 200,
        boxShadow: `0 0 10px ${colors.white.bottom}`
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
        color: colors.white.bottomBoxIcon,
        borderColor:colors.white.centralBottomIcon,
        backgroundColor: colors.white.centralBottomIcon
    },
    buttonIcon: {
        fontSize: 40,
        color: colors.white.bottomCentralIcon
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
        top: -15
    }, 
    centralIconBox: {
        position: 'relative',
        top: -35,
        backgroundColor: colors.white.centralBottomIcon,
        padding: 10,
        borderRadius: 40,
        height: 80,
        boxShadow: `0 0 10px ${colors.white.centralBottomIcon}`,

    }
})