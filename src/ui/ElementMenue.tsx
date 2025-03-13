import { useState, useEffect, useRef } from "react";
import { Box, Button } from "@react-native-material/core";
import { GestureResponderEvent, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../styles/colors";

let startTouchPosition = -1;
let baseTopPosition = 60;

interface ElementMenueProps {
    file: boolean, 
    open: boolean, 
    setOpen: (b: boolean) => void
    setAction: (s: string) => void
}

export default function ElementMenue ({open, setOpen, file, setAction}: ElementMenueProps) {

    const [ topPosition, setTopPosition ] = useState(100);

    let ready = useRef<boolean>(false);
    let start = useRef<boolean>(true);

    useEffect(()=>{ready.current=false}, [])

    useEffect(()=>{
        if (topPosition < 0) setTopPosition(0)
        if (start.current && !ready.current && (topPosition > 60) && (topPosition < 100) ) setTimeout((pos: number) => {setTopPosition(pos - 2)}, 3, topPosition)
        else if (start.current && !ready.current && topPosition <= 60) {
            ready.current = true ;
            start.current = false;
        }
        else if (!start.current && !ready.current && (topPosition < 100) ) setTimeout((pos: number) => {setTopPosition(pos + 2)}, 3, topPosition)
        else if (!start.current && !ready.current && topPosition >= 100) {
            setOpen(false);
            ready.current = true ;
            start.current = true; 
        }
    }, [topPosition])

    useEffect(()=>{
        console.log('open')
        setTimeout(()=>{setTopPosition(99)}, 10)
    }, [])

    return (
        <Box style={buttonStyle.all}>
            <Box style={buttonStyle.backBox} onTouchEnd={()=>{ready.current=false; start.current=false; setTopPosition(topPosition+1)}} />
            <Box 
                style={{...buttonStyle.workZone, top: `${topPosition}%`}}
                onTouchStart={(evt: GestureResponderEvent)=>{startTouchPosition = evt.nativeEvent.changedTouches[0].pageY}}
                onTouchEnd={()=>{
                    startTouchPosition = -1; 
                    if (topPosition > 80) {
                        baseTopPosition = 60;
                        setOpen(false)
                        setTopPosition(60)
                    }
                    else baseTopPosition = topPosition
                }}
                onTouchMove={(evt: GestureResponderEvent)=>{
                    if (startTouchPosition >= 0) {
                        const newPosition = baseTopPosition-(startTouchPosition - evt.nativeEvent.changedTouches[0].pageY)/7;
                        setTopPosition(newPosition < 0 ? 0 : newPosition)
                    }
                }}
            >
                {!file&&<Button leading={(props)=><Icon name='folder-open' {...props} />} color="#4E7CA6" contentContainerStyle={buttonStyle.buttonIn} variant="outlined" title='Открыть' onPress={()=>setAction('Открыть')} />}
                <Button leading={(props)=><Icon name='download' {...props} />} color="#4E7CA6" contentContainerStyle={buttonStyle.buttonIn} variant="outlined" title='Скачать' onPress={()=>setAction('Скачать')} />
                <Button leading={(props)=><Icon name='delete' {...props} />} color="#4E7CA6" contentContainerStyle={buttonStyle.buttonIn} variant="outlined" title='Удалить' onPress={()=>setAction('Удалить')} />
                <Button leading={(props)=><Icon name='share' {...props} />} color="#4E7CA6" contentContainerStyle={buttonStyle.buttonIn} variant="outlined" title='Поделиться' onPress={()=>setAction('Поделиться')} />
            </Box>
        </Box>
    )
}

const buttonStyle = StyleSheet.create({
    button: {
        height: 50,
        color: 'black',
        backgroundColor: colors.white.longPressPanel.background,
        borderRadius: 0, 
        alignItems: 'flex-start', 
        justifyContent: 'center'
    },
    buttonIn: {
        width: '100%',
        height: 50,
        textAlign: 'left',
        justifyContent: 'flex-start'
    },
    title: {
        color: colors.white.longPressPanel.text
    },
    icon: {
        color: colors.white.longPressPanel.text
    },
    backBox: {
        backgroundColor: 'white',
        opacity: 0.85,
        zIndex: 99,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    workZone: {
        backgroundColor: colors.white.longPressPanel.background, 
        borderRadius: 30,
        borderStyle: 'solid',
        borderColor: colors.white.longPressPanel.border,
        borderWidth: 3,
        borderTopWidth: 15,
        boxShadow: `0 0 10px ${colors.white.longPressPanel.border}`,
        minHeight: '200%', 
        zIndex: 100,
        paddingTop: 20
    },
    all: {
        position: 'absolute', 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 101,
    }
})