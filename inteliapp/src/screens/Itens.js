import * as React from 'react';

import axios from 'axios'
import { Text, View, ScrollView } from 'react-native';

import ItemBox from '../utils/ItemBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Itens() {
  const [itens, setItens] = React.useState([]);
  const [count, setCount] = React.useState(0);
  async function getItens () {
    const t = await AsyncStorage.getItem('token');
    console.log(`https://backfreeze.herokuapp.com/api/users/${t}/`)
    await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(res => {
      setItens(res.data.data.User[0].items)
    })
    .catch(err => {
      console.log(err)
    })
  }

  React.useEffect(() => {
    if (count < 4) {
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
          itens !== undefined ? itens.map(item => {return (<ItemBox key={item._id} _id={item._id} nome={item.nome} validade={item.validade} codigo={item.codigo}></ItemBox>)}) : null
        }
        </ScrollView>
      </View>
    );
  }

export default Itens;