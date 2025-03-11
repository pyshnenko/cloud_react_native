import { TokenLocalData } from "../types/api";
import storage from "./storage";
import { getContent } from "../hook/useFolderLocation";
import { Data } from "../hook/useFolderLocation";
import { jwtDecode } from "jwt-decode";
import { User } from "../hook/useUserAuth";
import Api from "./http/api";
import { useLoading } from "../displayMech/loading";
import cookies from "./http/cookies";

export async function startAuth(setLocation: (s: string)=>void) {
    const loading = useLoading;
    const crypt: string | null = (await storage.get('cloudAToken'));
    const saved: string | null = (await storage.get('cloudToken'));
    let decr: TokenLocalData & {exp: number};
    loading(true, 'startFuth');
    if ((saved)&&(crypt)) {
        try {
            decr = jwtDecode(saved) as TokenLocalData & {exp: number};
            let updToken = await Api.tokenUPD(saved, crypt);
            if (updToken.status === 200) {
                storage.set('cloudAToken', String(updToken.data.atoken), 'updAToken startAuth')
                storage.set('cloudToken', String(updToken.data.token), 'updToken startAuth')
                User.setToken(String(updToken.data.token), String(updToken.data.atoken), decr);
                setLocation('/');
                cookies.set(String(updToken.data.token))
                loading(false, 'startFuth');
                //window.location.href='/Файлы';
            }
        } catch(e: any) {
                User.exit();
                loading(false, 'startFuth');
                cookies.clear()
                //window.location.href='/Войти';
        } finally {
            loading(false, 'startFuth');
        }
    }
    else {
        User.exit();
        loading(false, 'startFuth');
        //window.location.href='/Войти';
    }
    loading(false, 'startFuth');
}