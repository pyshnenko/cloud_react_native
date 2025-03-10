import { StyleSheet, Dimensions } from 'react-native';
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import Api from '../src/mech/api';
import { Data, FolderContext } from '../src/hook/useFolderLocation';
import { useState, useEffect, useContext } from 'react';
import FilesList from '../src/ui/FilesList';
import { getContent } from '../src/hook/useFolderLocation';
import { Loading, useLoading } from '../src/displayMech/loading';
import { ScaledSize } from 'react-native';
import colors from '../src/styles/colors';
//import cookie from '@/components/mech/cookie';

export default function WorkPage() {
    //console.log('work page start')

  const loading = useLoading;

  let dataCont: {
    folds: Data, 
    location: string, 
    setLocation: (str: string) => void,
    setData: (data: Data) => void,
    window: ScaledSize
  } = useContext(FolderContext);

  useEffect(()=>{
    //console.log('workPage')
    //console.log(dataCont)
  }, [dataCont])

  return (
    <Box style={{
      backgroundColor: colors.background, 
      height: '100%', 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 0,
      position: 'absolute',
      top: 0, 
      left: 0
    }}>
      <Text>{dataCont.location}</Text>
      <FilesList folds={dataCont.folds} location={dataCont.location} setLocation={dataCont.setLocation} setData={dataCont.setData} window={dataCont.window} />
    </Box>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'aliceblue',
    marginTop: 25
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
