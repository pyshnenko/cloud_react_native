import { useEffect, useState, useRef } from "react";
import { Data } from "../hook/useFolderLocation";
import { Button, Box, Text, TextInput } from "@react-native-material/core";
import FolderShortcat from "./FolderShortcat";
import { TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useLoading } from "../displayMech/loading";
import { getContent } from "../hook/useFolderLocation";
import ElementMenue from "./ElementMenue";
import { User } from "../hook/useUserAuth";
import Api from "../mech/http/api";
import download from "../mech/download";
import cookies from "../mech/http/cookies";
import { Url } from "../mech/http/httpserv";
import TextInputField, {TextProps, ReadyProps, emptyText} from "./TextInputField";
import { ScaledSize } from "react-native";
import SearchPanel from "./searchPanel";
import LabelCentralBox from "./LabelCentralBox";
import SearchList from "./searchList";
import click from "../mech/click";
import { bottomWidth } from "../pageElements/bottomPanel";
import ImageViewer, {isImage} from "./imageViewer";

const loading = useLoading;

export default function FilesList({folds, location, setLocation, setData, window}: {folds: Data, location: string, setLocation: (str: string) => void, setData: (data: Data)=>void, window: ScaledSize}) {
    const [ pos, setPos ] = useState<number>(-3);
    const [ open, setOpen ] = useState(false);
    const [searchFolds, setSearchFolds] = useState<Data>({files: [], directs: []});
    const [ searchMode, setSearchMode ] = useState<boolean>(false)
    const [imgWiew, setImgWiew] = useState<string | null>(null)
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

    const doubleClick = (index: number) => {
        const res = click();
        setPos(index)
        if (index < folds.directs.length) {
            if (res.isDouble) {
                setSearchMode(false)
                setPos(-2)
                newLocation(index)
            } 
        }
        else if (isImage(folds.files[pos - folds.directs.length])) {
            console.log('open img')
            setImgWiew(folds.files[pos - folds.directs.length])
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
        setSearchMode(false)
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
            <SearchPanel {...{searchMode, setSearchMode, location, setSearchFolds: setData}} />
            <ImageViewer {...{location, name: imgWiew, window, setImg: setImgWiew}} />
            {searchMode ? 
                <ScrollView style={{
                    width: '100%',
                    height: window.height-bottomWidth-60-10
                }}>          
                    <SearchList {...{folds, location, doubleClick, longPress, pos}} />
                </ScrollView> :
                <ScrollView style={{
                    width: window.width - (window.width%90),
                    height: window.height-bottomWidth-60-10
                }}>                
                    <LabelCentralBox {...{location, folds, doubleClick, longPress, pos}} />
                </ScrollView>
            }
        </Box>
    )
}