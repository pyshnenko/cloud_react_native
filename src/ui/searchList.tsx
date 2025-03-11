import { Data } from "../hook/useFolderLocation";
import { Text } from "@react-native-material/core";

export default function SearchList(folds: Data) {
    return (<>
        {folds.directs.map((item: string, index: number)=><Text key={`directs - ${index}`}>{item}</Text>)}
        {folds.files.map((item: string, index: number)=><Text key={`directs - ${index}`}>{item}</Text>)}
    </>)
}