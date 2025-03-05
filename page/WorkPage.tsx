import { StyleSheet } from 'react-native';
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import Api from '../src/mech/api';
import { Data, FolderContext } from '../src/hook/useFolderLocation';
import { useState, useEffect, useContext } from 'react';
import FilesList from '../src/ui/FilesList';
import { getContent } from '../src/hook/useFolderLocation';
import { Loading, useLoading } from '../src/displayMech/loading';
//import cookie from '@/components/mech/cookie';

export default function WorkPage() {
    console.log('work page start')

  const loading = useLoading;

  let dataCont: {
    folds: Data, 
    location: string, 
    setLocation: (str: string) => void,
    setData: (data: Data) => void
  } = useContext(FolderContext);

  useEffect(()=>{
    console.log('workPage')
    console.log(dataCont)
  }, [dataCont])

  return (
    <Box style={{
      backgroundColor: 'aliceblue', 
      height: '100%', 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 50
    }}>
      <Text>{dataCont.location}</Text>
      <FilesList folds={dataCont.folds} location={dataCont.location} setLocation={dataCont.setLocation} setData={dataCont.setData} />
      {false&&<Button title='loading' onPress={()=>{
        loading(true, 'button');
        setTimeout(()=>{loading(false, 'button')}, 1000)
      }} />}
      {false&&<Button title='обновить' style={{margin: 10}} onPress={()=>{
        loading(true, 'indexUpdate');
        getContent(dataCont.location)
        .then((res: Data | null) => {
          console.log(res)
          if (res !== null) dataCont.setData(res)
        })
        .catch((e: any) => console.log(e))
        .finally(()=>loading(false, 'indexUpdate'))
      }} />}
    </Box>
  );
}

/*
      <Image 
        source={require('../../assets/images/spamigorLogo.png')} />*/
/*
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello World</ThemedText>
        <ThemedText type="default">Первое приложение под андроид</ThemedText>
        <Button title="Типа кнопка" onPress={() => alert("🎉🎉🎉")}/>
        <Button title="Storage" onPress={async () => console.log(await storage.get('cloudToken'))}/>
        <Button title="Folder" onPress={async () => console.log(data.location)}/>
        <Button title="setFolder" onPress={async () => console.log(data.setLocation('/test'))}/>
        <Button title="setFolder/" onPress={async () => console.log(data.setLocation('/'))}/>
        <Button title="clear" onPress={async () => console.log(await storage.clear())}/>
      </ThemedView>
      */

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
