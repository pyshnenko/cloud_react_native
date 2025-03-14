/**
 * Ярлычки или превьюшки картинок
 */

import { Box } from "@react-native-material/core";
import { Image } from "react-native";
import colors from "../../styles/colors";
import { dataUrl } from "../../mech/http/httpserv";
import { User } from "../../hook/useUserAuth";
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';
import fileMech from "../../mech/fileMech";
import { useState } from "react";

export function FileView(name: string, location: string, gType: string | null = null, gComunity: boolean = false) {
    //console.log(location)
    const [load, setLoad] = useState<boolean>(false);
    const type: {text: string, community?: boolean} = gType ? {text: gType, community: gComunity} : 
    fileMech.nameToType(name);
    //console.log(type)

    switch (type.text) {
        case 'image': return (<Box style={{width: 48, height: 48}}>
            <Image 
                style={{zIndex: load ? 3 : 2, width: 48, height: 48, backgroundColor: 'aliceblue', borderRadius: 10}} 
                source={{uri: `${dataUrl}${location||'/'}${name}?t=${User.getToken()}`}}
                onLoad={()=>setLoad(true)} />
            <Icon name='image' style={{
                color: colors.white.files, 
                fontSize: 48,
                position: 'relative',
                top: -48,
                left: 0,
                zIndex: load ? 2 : 3
            }} />
        </Box>)//`https://cloud.spamigor.ru/data${location||'/'}${name}?t=${User.getToken()}`
        default: return (<>{type?.community ? <IconC name={type.text as any} style={{
            color: type.text === 'folder' ? colors.white.folders : colors.white.files, 
            fontSize: 48
        }} /> : <Icon name={type.text as any} style={{
            color: type.text === 'folder' ? colors.white.folders : colors.white.files, 
            fontSize: 48
        }} />}</>)
    }
}