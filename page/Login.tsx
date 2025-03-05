import React, { useEffect, useState } from 'react';
import { Box, Text, TextInput, Button } from "@react-native-material/core";
import Api from '../src/mech/api';
import { User } from '../src/hook/useUserAuth';

export default function Login () {

    const [error, setError] = useState<{email:boolean, pass: boolean, text: string}>({email: false, pass: false, text: ''});
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [emailresetMessage, setEmailResetMessage] = useState<{visible: boolean, text: string}>({visible: false, text: ''});

    const textStyle = {
        margin: 1, 
        width: 250,
        zIndex:20, 
        backgroundColor: 'white',
        boxShadow: '0 0 30px 10px white'
    }

    const handleSubmit = async (demoMode: boolean = false) => {
        console.log('start');
        const emailS: string = (demoMode ? 'demo' : email);
        const password: string = (demoMode ? 'demodemo' : pass);
        console.log(emailS)
        if ((emailS==='')||(password==='')) setError({email: true, pass: true, text: 'Заполни поля'})
        else {
            setError({email: false, pass: false, text: ''})
            Api.login({pass: password, email: emailS.includes('@') ? emailS: undefined, login: emailS.includes('@') ? undefined: emailS})
            .then(async (res: any)=> {
                console.log(res.data)
                console.log('token add');
                User.setToken(String(res.data.token), String(res.data.atoken))
            })
            .catch((e: any)=>{
                console.log(e.response.status);
                setError({email: true, pass: true, text: 'Неверные данные'});
            });
        }
    }
    return (
        <Box>
            <Box style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 10,
                height: 10,
                backgroundColor: 'burlywood',
                boxShadow: `-10px 0 150px 250px burlywood`,
                borderRadius: '100px',
                zIndex: 1
            }} />
            {emailresetMessage.visible ? <Text>{emailresetMessage.text}</Text>:
            <Box style={{
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '90%', 
                justifyContent: 'center', 
                zIndex: 10
            }}>
                {error&&<Text color="error" style={{padding: 1, zIndex: 20}}>{error.text}</Text>}
                <TextInput 
                    color={error.email?'red':'black'} 
                    style={textStyle}  
                    id="loginBox" 
                    label="Логин/email" 
                    variant="outlined" 
                    value={email}
                    onChangeText={(text: string)=>{setEmail(text)}}
                 />
                <TextInput 
                    color={error.email?'red':'black'} 
                    style={textStyle} 
                    label="Пароль" 
                    variant="outlined" 
                    autoComplete='password'
                    value={pass}
                    onChangeText={(evnt: string)=>{setPass(evnt)}}
                 />
                <Box style={{zIndex: 20}}>
                    <Button title='Вход' style={{margin: 8, boxShadow: '0 0 30px 10px white'}} variant="contained" onPress={()=>handleSubmit()} />
                </Box>
                <Button 
                style={{margin: 4, boxShadow: '0 0 30px 10px white', zIndex: 1, width: 228}} 
                variant="contained" 
                color="secondary"
                title='Демонстрационный режим'
                onPress={()=>{handleSubmit(true)}}
                />
            </Box>}
        </Box>
    )
}