import axios from 'axios';

const baseURL = "https://cloud.spamigor.ru/api";//'http://192.168.56.245:8799/api';//'http://192.168.56.245:8799/api';//"http://localhost:8799/api";//
export const dataUrl = "https://cloud.spamigor.ru/data";//'http://192.168.56.245:8801/data'
export const Url = "https://cloud.spamigor.ru";//'http://192.168.56.245:8801/data'
console.log(baseURL)
const jsonHeader = {
  "Content-type": "application/json"
};

export const loginApi = () => axios.create({
    baseURL,
    headers: jsonHeader
});
  
export const privateApi = (token: string) => axios.create({
    baseURL,
    headers: {
      ...jsonHeader,
      "Authorization": `Bearer ${token}`
    }
});
  
export const getApi = (value: string)=> axios.get(`${baseURL}/register?name=${value}`)