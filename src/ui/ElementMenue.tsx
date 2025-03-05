import { useState, useEffect } from "react";
import { Box, Button } from "@react-native-material/core";
import { GestureResponderEvent, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

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

    let ready = false;

    useEffect(()=>{
        if (topPosition < 0) setTopPosition(0)
        if (!ready && (topPosition > 60) && (topPosition < 100) ) setTimeout((pos: number) => {setTopPosition(pos - 2)}, 3, topPosition)
        else if (!ready && topPosition <= 60) {
            ready = true    
        }
    }, [topPosition])

    useEffect(()=>{
        console.log('open')
        setTimeout(()=>{setTopPosition(99)}, 10)
    }, [])

    return (
        <Box 
            style={{
                position: 'absolute', 
                top: `${topPosition}%`, 
                left: 0, 
                backgroundColor: 'lightgray', 
                width: '100%', 
                minHeight: '200%', 
                borderRadius: 30,
                borderStyle: 'solid',
                borderColor: 'black',
                borderWidth: 3,
                borderTopWidth: 15,
                zIndex: 100,
                paddingTop: 20
            }}
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
                {!file&&<Button leading={(props)=><Icon name='folder-open' {...props} />} contentContainerStyle={buttonStyle.buttonIn} variant="outlined" color="#0000FF" title='Открыть' onPress={()=>setAction('Открыть')} />}
                <Button leading={(props)=><Icon name='download' {...props} />} contentContainerStyle={buttonStyle.buttonIn} variant="outlined" color="#0000FF" title='Скачать' onPress={()=>setAction('Скачать')} />
                <Button leading={(props)=><Icon name='delete' {...props} />} contentContainerStyle={buttonStyle.buttonIn} variant="outlined" color="#0000FF" title='Удалить' onPress={()=>setAction('Удалить')} />
                <Button leading={(props)=><Icon name='share' {...props} />} contentContainerStyle={buttonStyle.buttonIn} variant="outlined" color="#0000FF" title='Поделиться' />
            </Box>
    )
}

const buttonStyle = StyleSheet.create({button: {
    height: 50,
    color: 'black',
    backgroundColor: 'lightgray',
    borderRadius: 0, 
    alignItems: 'flex-start', 
    justifyContent: 'center'
    },
    buttonIn: {
        width: '100%',
        height: 50,
        textAlign: 'left',
        justifyContent: 'flex-start',
}})