import AsyncStorage from '@react-native-async-storage/async-storage'

const addData = async (key: string, data: string, from: string) => {
    //console.log(`storage add on ${key} from ${from}`)
    await AsyncStorage.setItem(key, data)
}

const getData = async (key: string) => {
    let j: string | null = '';
    try {
        j = await AsyncStorage.getItem(key)
    } catch(e: any) {
        console.log('get data error')
        console.log(e)
        j = null
    }

    console.log(j)
    return j
}

const clearData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e: any) {
        console.log(e)
    }
}

export default {
    set: addData,
    get: getData,
    setItem: addData,
    getItem: getData,
    clear: clearData
}