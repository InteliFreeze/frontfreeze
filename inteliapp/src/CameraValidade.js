import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Validade({route}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: '#000345'}}>
      <View style={{ marginTop: 64, width: '80%' }}>
        <Ionicons style={{width: 24, height:24}} onPress={() => route.params.navigate('AddItens')} name='arrow-back' color={"#ffffff"} size={24} />
        <Text style={{ marginTop: 32, color: '#ffffff', fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Agora é a vez da validade: </Text>
      </View>
      <Camera onTouchEndCapture={Camera.takePictureAsync} style={{height: '100%', width: '100%', display: 'flex'}} type={type}>
        <View style={{height: '80%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#ffffff'}}>Pressione para escanear</Text>
        </View>
      </Camera>
    </View>
  );
}

