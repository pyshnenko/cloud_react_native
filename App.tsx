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
  View,
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

const FolderContext = createContext({
  folds: {}, 
  location: '', 
  setLocation: (s: string)=>{}, 
  setData: (d: {directs: string[], files: string[]})=>{}
});

export default function App() {

  const colorScheme = useColorScheme();
  const loading = useLoading;
  const [ loginState, setLoginState ] = useState<boolean>(false);
  const [ data, setData ] = useState<Data>({directs: [], files: []});
  const [ location, setLocation ] = useState<string>('');
  
  createUserAuth(loginState, setLoginState, setData);
  console.log('hello')

  saveContext(FolderContext);

  useEffect(() => {
    console.log('tablayout useeffect')
    startAuth(setLocation)
  }, [])

  useEffect(()=>{
    console.log('loginState')
    console.log(loginState)
  }, [loginState])

  useEffect(()=> {
    console.log('layout data use effect')
    console.log(data)
  }, [data])

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
    })
    .catch((e: any) => console.log(e))
    .finally(()=>loading(false, 'updateLocation'))
  }, [location])
  
  return (<Box style={style.display}>
    {loginState ? 
      <FolderContext.Provider value={{folds: data, location: location, setLocation, setData }}>
        <WorkPage />
      </FolderContext.Provider> : 
      <Login />}
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