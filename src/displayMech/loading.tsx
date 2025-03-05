import { useState, useRef, useEffect } from 'react';
import copy from 'fast-copy';
import { Box } from '@react-native-material/core';
import { Dimensions, Image } from "react-native";

const windowDimensions = Dimensions.get('window');

let openArr: string[] = [];
let openGlob: string[] = [];
let setOpenGlob: (b: string[])=>void;

export function useLoading(openBool: boolean, name: string) {

    if (openBool && !openGlob.includes(name) && setOpenGlob) {let buf = copy(openGlob); buf.push(name); setOpenGlob(buf)}
    else if (!openBool && openGlob.includes(name) && setOpenGlob) {let buf = copy(openGlob); buf.splice(openGlob.indexOf(name), 1); setOpenGlob(buf)}
}

export function Loading() {

    const [width, setWidth] = useState(windowDimensions);
    const [deg, setDeg] = useState<number>(-1);

    useEffect(()=>{
        setDeg(0)
        const subscription = Dimensions.addEventListener(
            'change',
            ({window, screen}) => {
                setWidth(window);
            },
        );
        return () => subscription?.remove();
    }, [])

    useEffect(()=>{
        setTimeout((degN: number)=>setDeg(degN), 10, deg+2)
        //console.log(openArr)
    }, [deg])

    let [open, setOpen] = useState<string[]>(openArr);
    useEffect(()=>{
        openArr = open
        console.log(open)
    }, [open]);
    openGlob = open;
    setOpenGlob = setOpen;

    return (
        <>{open.length === 0 ? null :<Box style={{
            zIndex: 10000, 
            position: 'absolute', 
            width: width.width, 
            height: width.height, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }}>
            <Box style={{
                zIndex:10001,
                width: '100%',
                minWidth: width.width,
                height: '100%',
                minHeight: width.height,
                backgroundColor: 'white',
                opacity: 0.95,
                position: 'absolute',
                top: 0,
                left: 0
            }}/>
            <Image style={{zIndex:10002, transform: [{rotateZ: `${deg}deg`}]}} source={require('../../public/images/react-logo.png')}/>
        </Box>}</>)
}