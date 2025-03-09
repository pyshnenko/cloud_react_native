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
import { getContent, Data, FolderContext } from "../hook/useFolderLocation";
import { pick, types, DocumentPickerResponse } from '@react-native-documents/picker'
import { useCallback, useContext } from "react";
import { uploadFiles, UploadFileItem } from "react-native-fs";
import { Url } from "../mech/httpserv";
import bottomPanelStyles from "../styles/bottomPanelStyles";
import axios, {AxiosProgressEvent} from "axios";
import { ScaledSize } from "react-native";

interface progressInt {current: {[key: string]:number}}

export default function BottomPanel ({setTextField, setReady, ready, location, setData}: {setData: (d: Data) => void , location: string, setTextField: (n: TextProps)=>void, setReady: (n: ReadyProps)=>void, ready: ReadyProps}) {

    const baseEmptyText = emptyText(setReady);

    const loading = useLoading;    
    
    let dataCont: {
        folds: Data, 
        location: string, 
        setLocation: (str: string) => void,
        setData: (data: Data) => void,
        window: ScaledSize,
        setProgress: (v:{[key: string]:number})=>void,
        progressRef: progressInt
    } = useContext(FolderContext);
    
    const newFolderName = () => setTextField({
        ...baseEmptyText,
        show: true,
        inputEnable: false
    })
    
    useEffect (()=>{
        if (ready.ready) {
            if (ready.result.bool) {
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
            }
            else loading(false, 'new_folder')
            setReady({ready: false, result: {text: '', bool: false}});
            setTextField(emptyText(setReady))
        }
    }, [ready])

    async function sendFileToServer(files: DocumentPickerResponse[]) {
        //loading(true, 'sendFile');
        for (let i = 0; i < files.length; i++) {
            let file = {
                uri: files[i].uri,
                name: files[i].name,
                type: files[i].type
            }
            let data = new FormData();
            data.append("file", file)
            console.log(User.getLogin())

            axios.post(`${Url}/upload`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `${User.getToken()}`,
                    folder: encodeURI(`${User.getLogin()}/${dataCont.location}`),
                    user: encodeURI(User.getLogin() || ''),
                    fname: encodeURI(files[i].name || '')
                }, 
                onUploadProgress: (progr: AxiosProgressEvent)=>{
                    const val = (Math.round(progr.loaded * 100 / (progr.total||1)))
                    dataCont.setProgress({...dataCont.progressRef.current, [files[i].name || '']: val});
                    dataCont.progressRef.current={...dataCont.progressRef.current, [files[i].name || '']: val}
                }
            })
            .then((res: any)=>console.log(res))
            .catch((e: any)=>console.log(e))
            .finally(()=>{     
                loading(true, 'new_folder')           
                getContent(location)
                .then((res: Data | null) => {
                    console.log(res)
                    if (res !== null) setData(res)
                })
                .catch((e: any) => console.log(e))
                .finally(()=>loading(false, 'new_folder'))
            })
        }
    }

    return (<Box style={bottomPanelStyles.all}>
        <Box style={bottomPanelStyles.outBox}>
            <TouchableOpacity onPress={newFolderName}>
                <Box style={{...bottomPanelStyles.boxIcon}}>
                    <IconB style={bottomPanelStyles.buttonIcon} name='folder-plus' />
                </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                try {
                    const pickResult = await pick({presentationStyle: 'fullScreen',
                        type: [types.allFiles],
                        allowMultiSelection: true})
                    sendFileToServer(pickResult)
                } catch (err: unknown) {
                    // see error handling
                }
                }}>
                <Box style={bottomPanelStyles.centralIconBox}>
                    <IconB style={bottomPanelStyles.icon} name="upload-cloud" />
                </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>User.exit()}>
                <Box style={{...bottomPanelStyles.boxIcon}}>
                    <IconC style={bottomPanelStyles.buttonIcon} name='exit-to-app' />
                </Box>
            </TouchableOpacity>
        </Box>
    </Box>)
}

