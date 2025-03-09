import { Box, TextInput, Text, Button } from "@react-native-material/core";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import textInputStyle from "../styles/textInputStyles";

export interface ReadyProps {
    id?: number | string, 
    ready: boolean, 
    result: {text: string, bool: boolean}
}

export interface TextProps {
    text: string,
    name: string,
    inputEnable: boolean,
    yButton: boolean,
    nButton: boolean,
    yButtonText?: string,
    nButtonText?: string,
    show: boolean,
    copyButton?: boolean,
    eventFunc: (v: ReadyProps) => void
}

export const emptyText = (setReady: (v: ReadyProps)=>void) => {return {
    show: false,
    inputEnable: true,
    yButton: true,
    yButtonText: '',
    nButton: true,
    nButtonText: '',
    name: '',
    text: '',
    copyButton: false,
    eventFunc: setReady
  }}

export default function TextInputField (props: TextProps) {
    //console.log(props)
    const [ textP, setTextP ] = useState<string>(props.text);

    useEffect(()=>{
        setTextP(props.text)
    }, [props])

    useEffect(()=>{
        console.log(textP)
    }, [textP])

    return (<>{props.show && <Box style={textInputStyle.all}>
        <Box style={textInputStyle.back} />
        <Box style={textInputStyle.elem}>
            <Text>{props.name}</Text>
            <TextInput 
                style={textInputStyle.inputStyle} 
                multiline={true} 
                defaultValue={props.text}
                value={textP} 
                onChangeText={(text: string)=>{
                    console.log(text)
                    if (!props.inputEnable) setTextP(text)
                }} />
            {props.copyButton && <Button onPress={()=>Clipboard.setString(textP)} title='Копировать' />}
            <Box style={textInputStyle.buttonsBox}>
                {props.yButton && <Button onPress={()=>{
                    props.eventFunc({ready: true, result: {text: textP, bool: true}})
                }} style={textInputStyle.button} color="green" title={props.yButtonText || 'Да'} />}
                {props.nButton && <Button onPress={()=>{
                    props.eventFunc({ready: true, result: {text: '', bool: false}})
                }} style={textInputStyle.button} color="red" title={props.nButtonText || 'Нет'} />}
            </Box>            
        </Box>        
    </Box>}</>)
}

