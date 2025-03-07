import { Box, IconButton } from "@react-native-material/core"
import Icon from 'react-native-vector-icons/AntDesign';
import IconB from 'react-native-vector-icons/Feather';
import IconC from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../hook/useUserAuth";
import TextInputField, {TextProps, ReadyProps} from "../ui/TextInputField";
import { useEffect, useState } from "react";

export default function BottomPanel () {

    const [ ready, setReady ] = useState<ReadyProps>({
        ready: false,
        result: {text: '', bool: false}
    })

    const [ textField, setTextField ] = useState<TextProps>(emptyText(setReady))

    useEffect (()=>{
        if (ready.ready) {
            console.log(ready.result)
            setReady({ready: false, result: {text: '', bool: false}});
            setTextField(emptyText(setReady))
        }
    }, [ready])

    const newFolderName = () => setTextField({
        ...textField,
        show: true,
    })

    return (<Box style={style.all}>
        <TextInputField {...textField} />
        <Box style={style.outBox}>
            <TouchableOpacity>
                <Box style={{...style.boxIcon}}>
                    <IconB style={style.buttonIcon} name='upload-cloud' />
                </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={newFolderName}>
                <Icon style={style.icon} name="pluscircle" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>User.exit()}>
                <Box>
                    <IconC style={style.buttonIcon} name='exit-to-app' />
                </Box>
            </TouchableOpacity>
        </Box>
    </Box>)
}

const style = StyleSheet.create({
    all: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'darkgrey',
        height: 80,
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
        position: 'relative',
        top: -40,
        fontSize: 80,
        borderRadius: 40,
        color: 'blue',
        boxShadow: '0 0 10px blue',
        borderColor:'blue',
        backgroundColor: 'white'
    },
    buttonIcon: {
        fontSize: 40
    },
    boxIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
})

const emptyText = (setReady: (v: ReadyProps)=>void) => {return {
    show: false,
    inputEnable: true,
    yButton: true,
    nButton: true,
    name: 'Введи название папки',
    text: '',
    eventFunc: setReady
}}