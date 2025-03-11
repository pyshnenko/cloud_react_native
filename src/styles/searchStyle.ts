import { StyleSheet } from "react-native"
import colors from "./colors"

export default StyleSheet.create({
    window: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        borderColor: colors.white.files,
        borderWidth: 2,
        backgroundColor: 'white',
        height: 40,
        boxShadow: `0 0 2px ${colors.white.files}`
    },
    search: {
        width: '80%',
        borderRadius: 20,
        zIndex: 11,
        marginLeft: 10,
        height: 38,
        marginBottom: 0
    },
    searchInput: {
        height: 38
    },
    box: {
        position: 'absolute',
        borderRadius: 40,
        borderColor: colors.white.files,
        borderWidth: 2,
        backgroundColor: 'white',
        maxHeight: 50,
        width: '90%',
        zIndex: 10,
        left: "5%"
    },
    icon: {
        fontSize: 30,
        color: colors.white.files,
        zIndex: 11
    },
    iconButton: {
        zIndex: 11
    }
})