import { Box, IconButton } from "@react-native-material/core"
import Icon from 'react-native-vector-icons/AntDesign';
import IconB from 'react-native-vector-icons/Feather';
import IconC from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../hook/useUserAuth";
import { useEffect, useState } from "react";
import {TextProps, ReadyProps, emptyText} from "../ui/TextInputField";
import Api from "../mech/api";
import { useLoading } from "../displayMech/loading";
import { getContent, Data } from "../hook/useFolderLocation";

export default function BottomPanel ({setTextField, setReady, ready, location, setData}: {setData: (d: Data) => void , location: string, setTextField: (n: TextProps)=>void, setReady: (n: ReadyProps)=>void, ready: ReadyProps}) {

    const baseEmptyText = emptyText(setReady);

    const loading = useLoading;
    
    const newFolderName = () => setTextField({
        ...baseEmptyText,
        show: true,
        inputEnable: false
    })
    
    useEffect (()=>{
        if (ready.ready) {
            console.log(ready.result)
            loading(true, 'new_folder')
            Api.askLS(User.getToken(), location, 'mkdir', ready.result.text)
                .then((res: any) => {
                    console.log(res);
                    getContent(location)
                    .then((res: Data | null) => {
                        console.log(res)
                        if (res !== null) setData(res)
                    })
                    .catch((e: any) => console.log(e))
                    .finally(()=>loading(false, 'new_folder'))
                })
                .catch((e: any) => {
                    console.log(e)
                    loading(false, 'new_folder')
                })
            setReady({ready: false, result: {text: '', bool: false}});
            setTextField(emptyText(setReady))
        }
    }, [ready])

    return (<Box style={style.all}>
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
        position: 'relative',
        top: -20,
        fontSize: 60,
        borderRadius: 30,
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