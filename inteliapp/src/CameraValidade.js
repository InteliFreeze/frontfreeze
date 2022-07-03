import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

export default function Validade({route}) {
  const takePhoto = async () => {
    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
      allowsEditing: true,
    });
    const manipResult = await manipulateAsync(img.uri, [], {base64: true, format: SaveFormat.PNG});
    
    await axios.post('https://backfreeze-ocr.herokuapp.com/img_to_str/', {"base64_img": manipResult.base64}).then(req, res => {
      console.log(res);   
  }).catch(err => {
    console.log(err)
        alert("Erro ao tentar enviar a imagem!");
      });
  };

  React.useEffect(() => {

    takePhoto();
  }, []);
  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: '#000345'}}>
      <View style={{ marginTop: 64, width: '80%' }}>
        <Ionicons style={{width: 24, height:24}} onPress={() => route.params.navigate('AddItens')} name='arrow-back' color={"#ffffff"} size={24} />
        <Text style={{ marginTop: 32, color: '#ffffff', fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Agora é a vez da validade: </Text>
      </View>
      <View style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </View>
  );
}

