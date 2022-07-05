import * as React from 'react';
import axios from 'axios';

import { Text, View, TextInput, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation: { navigate } }) {
    const [opacity, setOpacity] = React.useState(1);
    const verifyToken = async () => {    
        const tokenVerify = await AsyncStorage.getItem('token');
        if (tokenVerify !== null || tokenVerify !== '') {
            navigate('Main');
        }
    }
    const [token, setToken ] = React.useState();
    const changeTokenOnType = (newToken) => {
        setToken(newToken);
    }
    const changePage = async () => {
        await axios.get(`https://backfreeze.herokuapp.com/api/users/${token}/`).then(async res => {
          if (res.data.data.User[0] !== undefined) {
            await AsyncStorage.setItem('token', token);
            navigate('Main');
          } else {
            alert('Token inválido');
          }
        }).catch(err => {
          navigate('Login');
          alert('Erro de conexão!');
        });
        // if (token !== null && token !== '') {
        //     await AsyncStorage.setItem('token', token);
        //     navigate('Main');
        // } else {
        //     alert('Preencha o campo de token');
        // }
    }

    React.useEffect(() => {
        verifyToken();
        }, []);
    return (
        <View style={{ flex: 1, paddingTop: '50%', alignItems: 'center'}}>
           <Text style={{fontSize: 32, color: "#ffffff", fontWeight:'bold' }}>Seja bem-vindo!</Text>
           <Text style={{fontSize: 24, color: "#bdbdbd", fontWeight:'bold' }}>Digite o seu token:</Text>
           <View style={{ flex: 1, justifyContent: 'center', marginTop: -60}}>
               <TextInput
               onChangeText={(text) => changeTokenOnType(text)}
               style={{
                    height: 60,
                    width: 285,
                    backgroundColor: '#B4C9FF',
                    padding: 12,
                    margin: 32,
                    borderTopRightRadius: 32,
                    borderTopLeftRadius: 64,
                    borderBottomRightRadius: 64,
                    borderBottomLeftRadius: 32,
                    }}></TextInput>
                <View 
                style={{
                   height: 60,
                   width: 137,
                   backgroundColor: '#00C113',
                   padding: 12,
                   marginLeft: 32,
                   borderTopRightRadius: 32,
                   borderTopLeftRadius: 64,
                   borderBottomRightRadius: 64,
                   borderBottomLeftRadius: 32,
                   alignItems: 'center',
                   justifyContent: 'center',
                   opacity: opacity
                }}
                onTouchStart={() => {setOpacity(0.9); setTimeout(() => {setOpacity(1)}, 200)}}
                onTouchEndCapture={changePage}>
                   <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Entrar</Text>
                </View>
        
           </View>
        </View>
    );
  }
