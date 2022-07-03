import * as React from 'react';

import axios from 'axios'
import { TextInput, Text, View, ScrollView, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AddItens({navigation: {navigate}}) {
  const [opacity, setOpacity] = React.useState(1);

    const [token, setToken ] = React.useState('');
    React.useEffect(() => {
        AsyncStorage.getItem('token').then(res => {
            setToken(res)
        }).catch(err => {
        })
    }, [])
    const [nome, setNome ] = React.useState('');
    const nomeChange = (nm) => {
        setNome(nm);
    }

    const [codigo, setCodigo ] = React.useState('');
    const codigoChange = (nm) => {
        setCodigo(nm);
    }

    const [validade, setValidade ] = React.useState('');
    const validadeChange = (nm) => {
      setValidade(nm);
    }
    async function sendRequest() {
      setNome('');
      setCodigo('');
      await axios.post(`https://backfreeze.herokuapp.com/api/users/${token}?item=${nome}&validade=${validade}&codigo=${codigo}`).then(res => {
        navigate('Main')
      }).catch(err => {
        alert("Não foi possível adicionar esse ingrediente!");
      })
    }

    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45, backgroundColor: '#000345'}}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Ionicons onPress={() => navigate('Itens')} name='arrow-back' color={"#ffffff"} size={24} style={{ marginBottom: 24 }} />
          <Ionicons onPress={() => navigate('CameraBarCode')} name='camera' color={"#ffffff"} size={24} style={{ marginBottom: 24 }} />
        </View>

        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Adicionar ingrediente</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Informe os dados.</Text>
        <Text style={{marginTop: 12, fontSize: 18, color: "#ffffff", fontWeight:'bold' }}>Nome do item:</Text>

        <ScrollView style={{
          width: 'auto',
          marginBottom: 12
        }}>
        <TextInput
          onChangeText={(text) => nomeChange(text)}
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
        }}></TextInput>
        <Text style={{marginTop: 32, fontSize: 18, color: "#ffffff", fontWeight:'bold', marginBottom: 12 }}>Validade:</Text>
        <CalendarPicker
        weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
        months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
        previousTitle="                                   <<<"
        nextTitle=">>>                                   "
        height={280}
        textStyle={{
          color: '#ffff',
          fontWeight: 'bold',
        }}
        todayBackgroundColor="grey"
        selectedDayColor="#ffffff"
        onDateChange={(date) => {validadeChange(date)}}
        ></CalendarPicker>

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
        }}></TextInput>

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

export default AddItens;
