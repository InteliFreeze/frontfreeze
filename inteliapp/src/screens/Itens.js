import * as React from 'react';

import axios from 'axios'
import { Text, View, ScrollView } from 'react-native';

import ItemBox from '../utils/ItemBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Itens() {
  let value;
  const [itens, setItens] = React.useState([]);
  const [token, setToken] = React.useState();
  const [count, setCount] = React.useState(0);
  async function getToken () {
    const t = await AsyncStorage.getItem('token');
    console.log(t)
    setToken(t)
    console.log("token: " + token)
    return t;
  }
  async function getItens () {
    console.log(token)
    console.log(`http://192.168.0.101:3000/api/users/${token}/`)
    await axios.get(`http://192.168.0.101:3000/api/users/${token}/`).then(res => {
      value = res.data.data.User[0].items;

      setItens(value)
    })
    .catch(err => {
      console.log(err)
    })
  }
  React.useEffect(() => {
    setToken(getToken());
    getItens();
    
  }, [])
  React.useEffect(() => {
    if (count < 4) {
      setToken(getToken())
      getItens()
      setCount(1)
  }
    
  }, [itens])
    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Itens</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Estes são os seus alimentos.</Text>
        <ScrollView style={{
          marginBottom: 93,
        }}>
        {
          itens !== undefined ? itens.map(item => {return (<ItemBox _id={item._id} nome={item.nome} validade={item.validade} codigo={item.codigo}></ItemBox>)}) : null
        }
        </ScrollView>
      </View>
    );
  }

export default Itens;