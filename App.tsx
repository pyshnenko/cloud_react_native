/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useRef, createContext} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { Box } from '@react-native-material/core';
import Login from './page/Login';
import { useLoading } from './src/displayMech/loading';
import { Data } from './src/hook/useFolderLocation';
import { saveContext, getContent } from './src/hook/useFolderLocation';
import { startAuth } from './src/mech/startAuth';
import { createUserAuth, User } from './src/hook/useUserAuth';
import WorkPage from './page/WorkPage';
import { Loading } from './src/displayMech/loading';
import BottomPanel from './src/pageElements/bottomPanel';
import { ScaledSize } from 'react-native';
import TextInputField, {TextProps, ReadyProps, emptyText} from "./src/ui/TextInputField";
import ProgressFullIndicator from './src/ui/ProgressFullIndicator';

const FolderContext = createContext({
  folds: {}, 
  location: '', 
  setLocation: (s: string)=>{}, 
  setData: (d: {directs: string[], files: string[]})=>{},
  window: {},
  progressRef: {},
  setProgress: (v:{[key: string]:number})=>{}
});

const windowDimensions = Dimensions.get('window');

export default function App() {

  const colorScheme = useColorScheme();
  const loading = useLoading;
  const [ loginState, setLoginState ] = useState<boolean>(false);
  const [ data, setData ] = useState<Data>({directs: [], files: []});
  const [ location, setLocation ] = useState<string>('');
  const [width, setWidth] = useState(windowDimensions);
  const [progress, setProgress] = useState<{[key: string]: number}>({})
  const progressRef = useRef<{[key: string]: number}>({})
  
  createUserAuth(loginState, setLoginState, setData);
  //console.log('hello')

  saveContext(FolderContext);

  useEffect(() => {
    console.log('tablayout useeffect')
    startAuth(setLocation);
    
    const subscription = Dimensions.addEventListener(
        'change',
        ({window, screen}) => {
            setWidth(window);
        },
    );
    return () => subscription?.remove();
  }, [])

  useEffect(()=>{
    console.log('layout use effect location')
    loading(true, 'updateLocation');
    setData({directs: [], files: []})
    console.log(location);
    getContent(location)
    .then((res: Data | null) => {
      console.log(res)
      if (res !== null) setData(res)
      else User.exit()
      loading(false, 'updateLocation')
    })
    .catch((e: any) => {
      console.log(e);
      
      loading(false, 'updateLocation')
    })
    .finally(()=>{
      console.log('location useEffect finaly')
      loading(false, 'updateLocation')
    })
  }, [location])
  
  const [ ready, setReady ] = useState<ReadyProps>({
      ready: false,
      result: {text: '', bool: false}
  })

  const [ textField, setTextField ] = useState<TextProps>(emptyText(setReady))
  
  return (<Box style={style.display}>
    <Loading />
    {loginState ? 
      <FolderContext.Provider value={{folds: data, location: location, setLocation, setData, window: width, progressRef, setProgress }}>
        <WorkPage />
        <BottomPanel setReady={setReady} setTextField={setTextField} ready={ready} location={location} setData={setData}/>
        <ProgressFullIndicator {...progress} />
      </FolderContext.Provider> : 
      <Login />}
      <TextInputField {...textField} />
  </Box>)
}

const style = StyleSheet.create({
  display: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }

})

