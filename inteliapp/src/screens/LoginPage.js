import * as React from 'react';
import axios from 'axios';

import { Text, View, TextInput, Button, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation: { navigate } }) {
    const [opacity, setOpacity] = React.useState(1);
    const [opacity1, setOpacity1] = React.useState(1);

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
    
    const [tokenToCreate, setTokenToCreate ] = React.useState();
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

      async function createToken () {
        await axios.post('https://backfreeze.herokuapp.com/api/users', {
          token: tokenToCreate,
          items: []
        }).then(res => {
          Alert.alert('Token criado com sucesso!');
        }).catch(err => {
          Alert.alert('Esse token já existe ou você está offline!');
        })
      }

    React.useEffect(() => {
        verifyToken();
        }, []);
    return (
        <View style={{ flex: 1, paddingTop: '21%', alignItems: 'center'}}>
           <Text style={{fontSize: 32, color: "#ffffff", fontWeight:'bold', marginBottom: 30 }}>Seja bem-vindo!</Text>
           <Text style={{fontSize: 24, color: "#bdbdbd", fontWeight:'bold', marginBottom: -80 }}>Digite o seu token:</Text>
           <View style={{ flex: 1, justifyContent: 'center', marginTop: -100, width: '100%'}}>
               <TextInput
               onChangeText={(text) => changeTokenOnType(text)}
               style={{
                    height: 60,
                    width: '80%',
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

           <Text style={{fontSize: 24, color: "#bdbdbd", fontWeight:'bold', marginTop: -120 }}>Crie um token:</Text>
           <View style={{ flex: 1, justifyContent: 'center', marginTop: -160, width: '100%'}}>
               <TextInput
               onChangeText={(text) => {setTokenToCreate(text);}}
               style={{
                    height: 60,
                    width: '80%',
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
                   opacity: opacity1
                }}
                onTouchStart={() => {setOpacity1(0.9); setTimeout(() => {setOpacity1(1)}, 200)}}
                onTouchEndCapture={createToken}>
                   <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Criar</Text>
                </View>
        
           </View>
        </View>
    );
  }
