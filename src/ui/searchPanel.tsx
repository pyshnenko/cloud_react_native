import { useState } from "react";
import { IconButton, Box, TextInput } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import searchStyle from "../styles/searchStyle";

export default function SearchPanel() {
    return (<>    
        <Box style={searchStyle.window}>
            <TextInput inputContainerStyle={searchStyle.searchInput} variant="standard" style={searchStyle.search} />
            <IconButton style={searchStyle.iconButton} icon={<Icon style={searchStyle.icon} name='search' />} />
            
        </Box>
    </>)
}
//<Box style={searchStyle.box}/>