import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CameraBarCode({navigation: {navigate}}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigate('CameraValidade', {codigo: data, navigate: navigate});
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: '#000345'}}>
      <View style={{ marginTop: 64, width: '80%' }}>
        <Ionicons style={{width: 24, height:24}} onPress={() => navigate('AddItens')} name='arrow-back' color={"#ffffff"} size={24} />
        <Text style={{ marginTop: 32, color: '#ffffff', fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Aponte para o código de barras do produto: </Text>
      </View>
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: '63.333%', width: '100%'}}
      >
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 1,
            width: '100%',
            backgroundColor: 'red',
            marginBottom: -75,
            marginTop: 150
          }}>
          </View>
          <Ionicons style={{marginTop: -75,  height: 300, width: 300}} name='barcode-outline' color={"#ffffff"} size={300} />
        </View>
      </BarCodeScanner>
    </View>
  );
}