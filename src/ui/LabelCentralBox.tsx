import { Box } from "@react-native-material/core";
import FolderShortcat from "./FolderShortcat";
import { Data } from "../hook/useFolderLocation";
import fileMech from "../mech/fileMech";

interface InputProps {
    location: string,
    folds: Data,
    pos: number,
    doubleClick: (i: number)=>void,
    longPress: (i: number)=>void
}

export default function LabelCentralBox(props: InputProps) {

    const {location, folds, doubleClick, pos, longPress} = props;

    return (
        <Box style={{
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'flex-start', 
            maxWidth: '100%',
            paddingBottom: 60
            //height: boxHeight
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
                    active={index === (pos - folds.directs.length)}
                    location={location}
                />
            )})}
        </Box>
    )
}