import Api from "../mech/http/api";
import { User } from "./useUserAuth";

export interface Data {
    directs: string[],
    files: string[]
}

export let FolderContext: any = null;

async function askApi(str: string = '/') {
    console.log('ask LS')
    try {
        return await Api.askLS(User.getToken(), str)
    } catch (e: any) {
        console.log(e)
        return {status: 401, data: {}}
    }
}
    
export async function getContent(str: string) {
    console.log('set path')
    console.log(str)
    const res = await askApi(str);
    console.log(res.status)
    if (res.status !== 200) return null
    else return res.data as Data
}

export function saveContext(cont: any) {FolderContext = cont}