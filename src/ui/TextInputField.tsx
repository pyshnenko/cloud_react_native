import { Box, TextInput, Text, Button } from "@react-native-material/core";
import { StyleSheet } from "react-native";

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
    show: boolean,
    eventFunc: (v: ReadyProps) => void
}

export default function TextInputField (props: TextProps) {
    return (<>{props.show && <Box style={style.all}>
        <Box style={style.back} />
        <Box style={style.elem}>
            <Text>{props.name}</Text>
            <TextInput style={style.inputStyle} multiline={true} defaultValue={props.text} editable={props.inputEnable} />
            <Box style={style.buttonsBox}>
                {props.yButton && <Button onPress={()=>{
                    props.eventFunc({ready: true, result: {text: '', bool: true}})
                }} style={style.button} color="green" title='Да' />}
                {props.nButton && <Button onPress={()=>{
                    props.eventFunc({ready: true, result: {text: '', bool: false}})
                }} style={style.button} color="red" title='Нет' />}
            </Box>            
        </Box>        
    </Box>}</>)
}

const style = StyleSheet.create({
    all: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:'column',
        zIndex: 100
    },
    back: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        opacity: 0.85,
        zIndex: 101
    },
    elem: {
        zIndex: 102,
        alignItems: 'stretch',
        width: '80%',
    },
    buttonsBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        minWidth: 200,
        margin: 8
    },
    button: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        
    }
})