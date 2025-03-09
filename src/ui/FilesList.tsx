import { useEffect, useState, useRef } from "react";
import { Data } from "../hook/useFolderLocation";
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import FolderShortcat from "./FolderShortcat";
import { TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useLoading } from "../displayMech/loading";
import { getContent } from "../hook/useFolderLocation";
import ElementMenue from "./ElementMenue";
import { User } from "../hook/useUserAuth";
import Api from "../mech/api";
import download from "../mech/download";
import cookies from "../mech/cookies";
import { Url } from "../mech/httpserv";
import TextInputField, {TextProps, ReadyProps, emptyText} from "./TextInputField";
import { ScaledSize } from "react-native";

const loading = useLoading;

const heightVal = (folds: Data, window:ScaledSize) => {
    return Math.floor((folds.directs.length + folds.files.length)/Math.floor(window.width/100))*100+200
}

export default function FilesList({folds, location, setLocation, setData, window}: {folds: Data, location: string, setLocation: (str: string) => void, setData: (data: Data)=>void, window: ScaledSize}) {
    const [ pos, setPos ] = useState<number>(-3);
    const [ open, setOpen ] = useState(false);
    const [ boxHeight, setBoxHeight] = useState<number>(heightVal(folds, window))
    const [ readyProps, setReadyProps ] = useState<ReadyProps>({
        ready: false,
        result: {
            text: '',
            bool: false
        }
    })
    const [ textFieldsState, setTextFieldsState ] = useState<TextProps>({
        show: false,
        yButton: true,
        nButton: true,
        name: 'name',
        text: 'text',
        inputEnable: false,
        eventFunc: setReadyProps
    })

    useEffect(()=>{
        console.log(readyProps);
        if (readyProps.ready) {
            setTextFieldsState(emptyText(setReadyProps))
        }
    }, [readyProps])

    useEffect(()=>{
        console.log(window.width%100)
        console.log(`width: ${window.width - (window.width%100)}`)
    }, [window])

    useEffect(()=>{
        setBoxHeight(heightVal(folds, window))
    }, [folds, window])

    const nameToType = (str: string) => {
        const extArr: string [] = str.split('.')
        const ext: string = extArr[extArr.length-1];
        //console.log(ext)
        switch (ext) { 
            case 'txt': return 'text-snippet'
            case 'rar': return 'archive'
            case 'zip': return 'archive'
            case 'pdf': return 'picture-as-pdf'
            case 'doc': return 'edit-document'
            case 'docx': return 'edit-document'
            case 'png': return 'image'
            case 'jpg': return 'image'
            case 'jpeg': return 'image'
            case 'ico': return 'image'
            default: return "insert-drive-file"
        }
    }

    let lastTap = useRef(0);
    const doubleClick = (index: number) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 1000;
        if ((now - lastTap.current) < DOUBLE_PRESS_DELAY) {
            setPos(-2)
            newLocation(index)
            
        } else {
            setPos(index)
            lastTap.current = now;
        }
    }

    const newLocation = (index: number) => {
        if ((index >= 0)&&(index < folds.directs.length)) {
            const objName: string = folds.directs[index]
            setLocation((location||'/') + objName + '/')
        }
        else if (index === -1) {
            let buf: string[] = location.split('/')
            let newAddr: string = '/'
            for (let i = 1; i < buf.length-2; i++ ) newAddr += buf[i]+'/'
            setLocation(newAddr);
        }
        else if (index === -2) {
            loading(true, 'indexUpdate');
            getContent(location)
            .then((res: Data | null) => {
                console.log(res)
                if (res !== null) setData(res)
            })
            .catch((e: any) => console.log(e))
            .finally(()=>loading(false, 'indexUpdate'))
        }
    }

    const longPressMenueAction = async (action: string) => {
        setOpen(false)
        setPos(-3)
        console.log(pos)
        switch (action) {
            case 'Открыть': return newLocation(pos);
            case 'Скачать': {
                const name = pos >= folds.directs.length ? folds.files[pos - folds.directs.length] : folds.directs[pos]
                console.log('download')
                console.log(name)
                if (pos >= folds.directs.length) download(location+name, name, User.getToken())
                else if (pos >= 0) {
                    cookies.set(User.getToken());
                    loading(true, 'save');
                    Api.askLS(User.getToken(), `${location}/${folds.directs[pos]}`, 'tar', '', true)
                    .then(async (res: any)=>{
                        console.log(res.data);
                        setTimeout((nm: string, token: string)=>
                            {
                                download(`/${nm}`, 'Archive.zip', token, ''); 
                                loading(false, 'save')
                            }, 
                            3000, 
                            res.data.addr,
                            User.getToken()
                        ) 
                    })
                    .catch((e: any)=> {console.log(e); loading(false, 'save')});
                }
                break;
            }
            case 'Удалить': {
                loading(true, 'rm');
                const fName: string = pos >= folds.directs.length ? folds.files[pos - folds.directs.length] : folds.directs[pos];
                await Api.askLS(User.getToken(), location, 'rm', fName);
                newLocation(-2);
                loading(false, 'rm')
                break;
            }
            case "Поделиться" : {
                loading(true, 'share')
                const fName: string = pos >= folds.directs.length ? folds.files[pos - folds.directs.length] : folds.directs[pos];
                try {
                    let res = await Api.askLS(User.getToken(),location, 'chmod', fName);
                    console.log(res.data?.tok)
                    let expUri = encodeURI(`${Url}/download?tok=${res.data.tok}&name=${res.data.name}&type=${res.data.type}`)
                    console.log(`expUri: ${expUri}`)
                    setTextFieldsState({
                        show: true,
                        name: 'Ссылка на скачивание',
                        text: expUri,
                        yButton: false,
                        nButtonText: 'Закрыть',
                        nButton: true,
                        inputEnable: true,
                        copyButton: true,
                        eventFunc: setReadyProps
                    })
                } 
                catch {(e: any)=>{console.log(e)}}
                loading(false, 'share')
            }
        }
    }

    const longPress = (index: number) => {
        console.log(index)
        setPos(index)
        setOpen(true)
    }
    return (
        <Box style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {open&&folds?.directs&&<ElementMenue open={open} setOpen={setOpen} file={pos >= folds?.directs.length} setAction={longPressMenueAction} />}
            <TextInputField {...textFieldsState} />
            <ScrollView>
                <Box style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    justifyContent: 'flex-start', 
                    maxWidth: window.width - (window.width%100),
                    height: boxHeight
                    }}>
                    <FolderShortcat 
                        name={'Обновить'} 
                        type="update"
                        active={false}
                        index={-2}
                        doubleClick={doubleClick}
                        longPress={longPress}
                        location={''}
                    />
                    {location !== '/' && 
                        <FolderShortcat 
                            name={'Назад'} 
                            type="arrow-back"
                            active={false}
                            index={-1}
                            doubleClick={doubleClick}
                            longPress={longPress}
                            location={''}
                    />}
                    {Array.isArray(folds.directs) && folds?.directs.map((item: string, index: number) => { return (
                        <FolderShortcat 
                            name={item} 
                            key={`folds-${index}`}
                            type="folder"
                            active={index === pos}
                            doubleClick={doubleClick}
                            longPress={longPress}
                            index={index}
                            location={location}
                        />
                    )})}
                    {Array.isArray(folds.files) && folds.files.map((item: string, index: number) => { return (
                        <FolderShortcat 
                            key={`files-${index}`}
                            doubleClick={doubleClick}
                            longPress={longPress}
                            index={index + folds.directs.length}
                            name={item} 
                            type={nameToType(item)}
                            active={index === (pos - folds.directs.length)}
                            location={location}
                        />
                    )})}
                </Box>
            </ScrollView>
        </Box>
    )
}