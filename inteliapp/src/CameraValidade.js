import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Validade({route}) {	
  const [opacity, setOpacity] = useState(1);
  const [validade, setValidade] = useState('03/07/2022');
  const [nome, setNome] = useState('');
  const [token, setToken ] = React.useState('');
    React.useEffect(() => {
        AsyncStorage.getItem('token').then(res => {
            setToken(res)
        }).catch(err => {
        })
    }, [])
  const takePhoto = async () => {
    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
      allowsEditing: true,
    });
    let manipResult = await manipulateAsync(img.uri, [], {base64: true});
    console.log(manipResult.base64);
    
    axios.post('https://backfreeze-ocr.herokuapp.com/img_to_str', {base64_img: manipResult.base64}).then(res => {
      setValidade(res.text_str);
  }).catch(err => {
    console.log(err)
        alert("Erro ao tentar enviar a imagem!");
      });
  };

  async function sendRequest() {

  }
  const [codigo, setCodigo ] = React.useState(route.params.codigo);
  const codigoChange = (nm) => {
      setCodigo(nm);
  }

  React.useEffect(() => {

    takePhoto();
  }, []);

  async function sendRequest() {
    setNome('');
    setCodigo('');
    setValidade('');
    console.log(nome, validade, codigo);
    await axios.post(`https://backfreeze.herokuapp.com/api/users/${token}?item=${nome}&validade=${validade}&codigo=${codigo}`).then(res => {
      console.log(route.params.navigate('Main'));
    }).catch(err => {
      Alert("Erro ao adicionar o item!");
    })
  }
  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: '#000345'}}>
      <View style={{ marginTop: 64, width: '80%' }}>
        <Ionicons style={{width: 24, height:24}} onPress={() => route.params.navigate('AddItens')} name='arrow-back' color={"#ffffff"} size={24} />
        <Text style={{ marginTop: 32, color: '#ffffff', fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Agora é a vez da validade: </Text>
      </View>
      <ScrollView style={{height: '100%', width: '100%', marginLeft: '30%', marginTop: 30}}>
        <Text style={{marginTop: 32, fontSize: 18, color: "#ffffff", fontWeight:'bold' }}>Nome:</Text>
        <TextInput
        onChangeText={(text) => setNome(text)}

        style={{
            height: 60,
            width: 285,
            backgroundColor: '#B4C9FF',
            padding: 12,
            marginTop: 12,
            borderTopRightRadius: 32,
            borderTopLeftRadius: 64,
            borderBottomRightRadius: 64,
            borderBottomLeftRadius: 32,
        }}>{nome}</TextInput>

        <Text style={{marginTop: 32, fontSize: 18, color: "#ffffff", fontWeight:'bold' }}>Código:</Text>
        <TextInput
        onChangeText={(text) => codigoChange(text)}

        style={{
            height: 60,
            width: 285,
            backgroundColor: '#B4C9FF',
            padding: 12,
            marginTop: 12,
            borderTopRightRadius: 32,
            borderTopLeftRadius: 64,
            borderBottomRightRadius: 64,
            borderBottomLeftRadius: 32,
        }}>{route.params.codigo}</TextInput>

        <Text style={{marginTop: 32, fontSize: 18, color: "#ffffff", fontWeight:'bold' }}>Validade:</Text>
        <TextInput
        onChangeText={(text) => setValidade(text.replace('.', '/').replace(/[A-z]/g, ''))}

        style={{
            height: 60,
            width: 285,
            backgroundColor: '#B4C9FF',
            padding: 12,
            marginTop: 12,
            borderTopRightRadius: 32,
            borderTopLeftRadius: 64,
            borderBottomRightRadius: 64,
            borderBottomLeftRadius: 32,
        }}>{validade}</TextInput>

        <View
        style={{
            height: 60,
            width: 137,
            backgroundColor: '#00C113',
            padding: 12,
            marginTop: 32,
            borderTopRightRadius: 32,
            borderTopLeftRadius: 64,
            borderBottomRightRadius: 64,
            borderBottomLeftRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: opacity
        }}
        onTouchStart={() => {setOpacity(0.9); setTimeout(() => {setOpacity(1)}, 200)}}
        onTouchEndCapture={sendRequest}
        >
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Adicionar</Text>

        </View>
      </ScrollView>
    </View>
  );
}

