import CookieManager from '@react-native-cookies/cookies';
import { dataUrl } from './httpserv';

// set a cookie
function cookiesSet(token: string) {
    CookieManager.set(dataUrl, {
        name: 'token',
        value: token,
    }).then((done: any) => {
        console.log('CookieManager.set =>', done);
    });
}

const clear = () => {
    CookieManager.clearAll()
    .then((success: any) => {
        console.log('CookieManager.clearAll =>', success);
    });
}

export default {
    set: cookiesSet,
    clear: clear
}