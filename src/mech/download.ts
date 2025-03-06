import RNFetchBlob from 'rn-fetch-blob';
import { Url } from './httpserv';
import { PermissionsAndroid } from 'react-native';

function download(locationFull: string, name: string, token: string, postfix: string) {
    const { dirs } = RNFetchBlob.fs;
    console.log(name)
    console.log(dirs.DownloadDir + '/' + name)
    const configfb = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: name,
          path: `${dirs.DownloadDir}/${name}`,
        },
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: name,
        path: `${dirs.DownloadDir}/${name}`,
    };
    console.log(`${Url}${postfix}${locationFull}?t=${token}`)
    RNFetchBlob.config(configfb || {})
     .fetch('GET', `${Url}${postfix}${locationFull}?t=${token}`, {})
     .then(res => {
         console.log("file downloaded")  
     })
     .catch(e => {
       console.log('invoice Download==>', e);
           });

    /*ReactNativeBlobUtil
        .config({
            // response data will be saved to this path if it has access right.
            path: dirs.DownloadDir + '/' + name,
            
        })
        .fetch('GET', `${dataUrl}${location}${name}`, {
            Authorization: `Bearer ${token}`,
            // more headers  ..
        })
        .then((res: any) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log('The file saved to ', res.path())
        })
        .catch((e: any)=>console.log(e))*/
}

export default async function getPermission(locationFull: string, name: string, token: string, postfix: string = '/data') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        console.log(granted)
        if (true){//granted === PermissionsAndroid.RESULTS.GRANTED) {
            download(locationFull, name, token, postfix);
        } else {
            console.log("please grant permission");
            // Запрашиваем разрешения для Android 13 и выше (API level 33+)
            // Будет показан нативный алерт
            const requestedPermissions = [
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
            ];
        
            const results = await PermissionsAndroid.requestMultiple(
              requestedPermissions,
            );
        
            const needsPermissions = Object.values(results).every(
              (result) =>
                result === PermissionsAndroid.RESULTS.DENIED ||
                result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
              );
        
            if(needsPermissions){
                console.log('ask perm')
              // Если прав нет, то в интерфейсе приложения запрашиваем у пользователя разрешение на получение прав
            }
        }
      } catch (err) {
        console.log("display error",err)    }
  };