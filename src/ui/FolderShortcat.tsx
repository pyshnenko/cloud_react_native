import { Box, Text, IconButton, Button } from "@react-native-material/core";
import { TouchableOpacity, Dimensions, Image } from "react-native";
import colors from "../styles/colors";
import { FileView } from "./small/iconImg";

interface Props {
    name: string, 
    type?: string | null, 
    active: boolean, 
    index: number, 
    doubleClick: (n: number)=> void, 
    longPress: (n: number)=> void, 
    location: string, 
    community?: boolean}

export default function FolderShortcat({name, active, index, doubleClick, longPress, location, community, type}: Props) {

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
                {FileView(name, location, type, community)}
                <Text style={{textAlign: 'center', fontSize: 14}} android_hyphenationFrequency="normal">{nameShortText}</Text>
            </Box>
        </TouchableOpacity>)
}

function shortName(name: string, active: boolean) {
    if (active) return name
    else if (name.length < 22) return name
    else return (name.slice(0, 20) + '...')
}
