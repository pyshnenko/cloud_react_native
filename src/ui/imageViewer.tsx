import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Box } from "@react-native-material/core";
import { Data } from "../hook/useFolderLocation";
import { dataUrl } from "../mech/http/httpserv";
import { User } from "../hook/useUserAuth";
import { StyleSheet, ScaledSize, TouchableOpacity } from "react-native";

export default function ImageViewer ({name, location, window, setImg}: {name: string | null, location: string, window: ScaledSize, setImg: (img: string | null)=>void}) {

    const [height, setHeight] = useState<number>(0.1);

    useEffect(()=> {
        if (name!==null){ 
            Image.getSize(`${dataUrl}${location||'/'}${name}?t=${User.getToken()}`)
            .then((res: {height: number, width: number})=> setHeight(res.height/res.width))
            .catch((e: any)=> console.log(e))
        }
    }, [name])

    return (
        <>{name !== null ? <Box style={{...imgStyle.all, width: window.width, height: window.height}}>
            <TouchableOpacity onPress={()=>setImg(null)} style={{...imgStyle.all, ...imgStyle.blackBox, zIndex: 2001, top: 0}} />
            <Image style={{...imgStyle.img, width: window.width*0.8, height: window.width*0.8*height}} source={{uri: `${dataUrl}${location||'/'}${name}?t=${User.getToken()}`}} />
        </Box> : null}</>
    )
}

const imagesTypes = [
    'png',
    'jpg',
    'jpeg',
    'svg',
    'bmp'
]

export function isImage(name: string) {
    if (!name) return false
    const val: string = name.split('.')[1] || '';
    return imagesTypes.includes(val);
}

const imgStyle = StyleSheet.create({
    all: {
        position: 'absolute',
        top: -30,
        left: 0,        
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blackBox: {
        backgroundColor: 'black',
        opacity: 0.85,
        width: '100%',
        height: '100%'
    },
    img: {
        zIndex: 2002,
        resizeMode: 'center'
    }
})