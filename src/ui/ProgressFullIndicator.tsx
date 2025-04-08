import { useState, useEffect, useContext } from "react";
import * as Progress from 'react-native-progress';
import { Box, Text } from "@react-native-material/core";
import progrssStyles from "../styles/progressStyles";
import { FolderContext, Data } from "../hook/useFolderLocation";
import { ScaledSize, ScrollView, TouchableOpacity } from "react-native";

export interface ProgressProps {
    [key: string]: number
}

interface progressInt {current: {[key: string]:number}}

export default function ProgressFullIndicator (props: ProgressProps) {  

    let extBuf: string[] = [];
    
      let dataCont: {
        window: ScaledSize,
        setProgress: (v:{[key: string]:number})=>void,
        progressRef: progressInt
      } = useContext(FolderContext);

    useEffect(()=>{
        //console.log(props)
        extBuf = [];
        Object.keys(props).map((item: string) => {if (props[item] < 100) extBuf.push(item)})
        console.log(extBuf)
    }, [props])

    return (<>{Object.keys(props).length!==0 && <Box style={{...progrssStyles.all, height: dataCont.window.height -0, width: dataCont.window.width}}>
        <TouchableOpacity style={progrssStyles.back} onPress={()=>{
            console.log(extBuf)
            if (extBuf.length === 0) {
                dataCont.setProgress({});
                dataCont.progressRef.current = {}
            }
        }}/>
            <Box style={{...progrssStyles.elem}}>
                <ScrollView>
                    {Object.keys(props).map((item: string, index: number) => <Box key={item} style={{width: '100%', height: 60}}>
                        <Progress.Bar progress={props[item]/100} width={dataCont.window.width*0.8} height={50} />
                        <Text style={progrssStyles.textOnProgress}>{item}</Text>
                    </Box>)}
                </ScrollView>
            </Box>
    </Box>}</>)
}