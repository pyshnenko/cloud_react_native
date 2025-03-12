import { Data } from "../hook/useFolderLocation";
import { Text, Box } from "@react-native-material/core";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FileView } from "./small/iconImg";

interface SearchListProps {
    folds: Data,
    location: string, 
    pos: number,
    doubleClick: (i: number)=>void,
    longPress: (i: number)=>void, 
}

export default function SearchList(props: SearchListProps) {
    const {folds, location, pos, doubleClick, longPress} = props;

    return (<Box style={{width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        {folds?.directs.map((item: string, index: number)=>{return (
            <TouchableOpacity key={`${index}-${item}-folder`} onPress={()=>doubleClick(index)} onLongPress={()=>longPress(index)}>
                <Box style={searchListStyle.labelBox}>
                    {FileView(item, '/', 'folder')}
                    <Text key={`directs - ${index}`}>{item}</Text>
                </Box>
            </TouchableOpacity>
        )})}
        {folds?.files.map((item: string, index: number)=>{return (
            <TouchableOpacity key={`${index}-${item}-file`} onLongPress={()=>longPress(index)}>
                <Box style={searchListStyle.labelBox}>
                {FileView(item, '/')}
                    <Text key={`directs - ${index}`}>{item}</Text>
                </Box>
            </TouchableOpacity>
        )})}
    </Box>)
}

const searchListStyle = StyleSheet.create({
    labelBox: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center'
    }
})