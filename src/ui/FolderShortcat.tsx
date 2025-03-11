import { Box, Text, IconButton, Button } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconC from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, Dimensions, Image } from "react-native";
import { User } from "../hook/useUserAuth";
import { dataUrl } from "../mech/httpserv";
import colors from "../styles/colors";

interface Props {name: string, type: string, active: boolean, index: number, doubleClick: (n: number)=> void, longPress: (n: number)=> void, location: string, community?: boolean}

export default function FolderShortcat({name, type, active, index, doubleClick, longPress, location, community}: Props) {

    const nameShortText: string = shortName(name, active);

    return (
        
        <TouchableOpacity onPress={()=>doubleClick(index)} onLongPress={()=>longPress(index)}>
            <Box 
                style={{ 
                    width: 100, 
                    padding: 4,
                    height: active ? 'auto' : 100, 
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    backgroundColor: active ? 
                        (colors.white.active) :
                        ''
                }}
            >
                {FileView(type, name, location, community)}
                <Text style={{textAlign: 'center', fontSize: 14}} android_hyphenationFrequency="normal">{nameShortText}</Text>
            </Box>
        </TouchableOpacity>)
}

function shortName(name: string, active: boolean) {
    if (active) return name
    else if (name.length < 22) return name
    else return (name.slice(0, 20) + '...')
}

function FileView(type: string, name: string, location: string, community: boolean = false) {
    //console.log(location)
    switch (type) {
        case 'image': return (<Box style={{width: 48, height: 48}}>
            <Image 
                style={{zIndex: 3, width: 48, height: 48, backgroundColor: 'aliceblue', borderRadius: 10}} 
                source={{uri: `${dataUrl}${location||'/'}${name}?t=${User.getToken()}`}} />
            <Icon name='image' style={{
                color: colors.white.files, 
                fontSize: 48,
                position: 'relative',
                top: -48,
                left: 0,
                zIndex: 2
            }} />
        </Box>)//`https://cloud.spamigor.ru/data${location||'/'}${name}?t=${User.getToken()}`
        default: return (<>{community ? <IconC name={type as any} style={{
            color: type === 'folder' ? colors.white.folders : colors.white.files, 
            fontSize: 48
        }} /> : <Icon name={type as any} style={{
            color: type === 'folder' ? colors.white.folders : colors.white.files, 
            fontSize: 48
        }} />}</>)
    }
}