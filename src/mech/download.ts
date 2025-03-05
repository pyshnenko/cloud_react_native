import ReactNativeBlobUtil from 'react-native-blob-util'
import { dataUrl } from './httpserv';

export default function download(location: string, name: string, token: string) {
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil
        .config({
            // response data will be saved to this path if it has access right.
            path: dirs.DocumentDir + '/' + name
        })
        .fetch('GET', `${dataUrl}${location}${name}`, {
            Authorization: `Bearer ${token}`,
            // more headers  ..
        })
        .then((res: any) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log('The file saved to ', res.path())
        })
        .catch((e: any)=>console.log(e))
}
