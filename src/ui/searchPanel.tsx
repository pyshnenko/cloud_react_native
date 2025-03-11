import { useState } from "react";
import { IconButton, Box, TextInput } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import searchStyle from "../styles/searchStyle";
import Api from "../mech/http/api";
import { User } from "../hook/useUserAuth";
import { Data } from "../hook/useFolderLocation";

export default function SearchPanel({setSearchMode, searchMode, location, setSearchFolds}: {setSearchMode: (s: boolean)=>void, searchMode: boolean, location: string, setSearchFolds: (d: Data)=>void}) {

    const [ searchText, setSearchText ] = useState<string>('');

    const search = async () => {
        const res = await Api.searchName(User.getToken(), {location, name: searchText})
        if (res.status === 200)
            setSearchFolds(res.data)
    }

    return (<>    
        <Box style={searchStyle.window}>
            <TextInput value={searchText} onChangeText={(text: string)=>setSearchText(text)} inputContainerStyle={searchStyle.searchInput} variant="standard" style={searchStyle.search} />
            {searchMode ?
            <IconButton 
                onPress={()=>{
                    setSearchMode(false);
                    setSearchFolds({files: [], directs: []})
                }} 
                style={searchStyle.iconButton} 
                icon={<Icon style={searchStyle.icon} 
                name='close' />} /> :
            <IconButton 
                onPress={()=>{
                    if (searchText.length) {
                        setSearchMode(true);
                        search()
                    }}} 
                style={searchStyle.iconButton} 
                icon={<Icon style={searchStyle.icon} name='search' />} />}
            
        </Box>
    </>)
}
//<Box style={searchStyle.box}/>