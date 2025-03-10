import { StyleSheet } from "react-native"
import colors from "./colors"

export default StyleSheet.create({
    window: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    search: {
        width: '80%',
        borderRadius: 20,
    },
    searchInput: {
        borderRadius: 40,
        backgroundColor: colors.files,
        margin: 8,
        paddingLeft: 8, 
        paddingRight: 8,
        paddingTop: 4
    },
    icon: {
        fontSize: 40,
        color: colors.files
    }
})