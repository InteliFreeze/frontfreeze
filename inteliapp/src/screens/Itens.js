import * as React from 'react';

import axios from 'axios'
import { RefreshControl, Text, View, ScrollView, Alert } from 'react-native';

import ItemBox from '../utils/ItemBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Itens({navigation: {navigate}}) {
  const [itens, setItens] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [opacity1, setOpacity1] = React.useState(1);
  const [opacity2, setOpacity2] = React.useState(1);
  const [opacity3, setOpacity3] = React.useState(1);

  async function getItens () {
    const t = await AsyncStorage.getItem('token');//backfreeze.herokuapp.com/api/users/${t}/`)
    await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(res => {
      setItens(res.data.data.User[0].items)
      setRefreshing(false);
    })
    .catch(err => {
    })
  }

  async function getItensLocal () {
    setRefreshing(true);

    const itensLocal = await AsyncStorage.getItem('itens');
    if (itensLocal === null) {
      AsyncStorage.setItem('itens', '[]');
    }
    setItens(JSON.parse(itensLocal));
    setRefreshing(false);

    
  }

  async function getItensFromWeb () {
    const t = await AsyncStorage.getItem('token');
    await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(async res => {
      setRefreshing(false);
      await AsyncStorage.setItem('itens', JSON.stringify(res.data.data.User[0].items)).then(
        getItensLocal()
      );

    })
    .catch(err => {
      Alert.alert("Você está offline!");
    });
  }

  async function sync () {
    const t = await AsyncStorage.getItem('token');
    const itensFromLocal = await AsyncStorage.getItem('itens');
    const JSONItens = JSON.parse(itensFromLocal);
    await axios.patch(`https://backfreeze.herokuapp.com/api/users/${t}/`, {items: JSONItens}).then(res => {
      Alert.alert("Sincronizado com sucesso!");
    }).catch(err => {
      Alert.alert("Você está offline!");
    });  
  }

  React.useEffect(() => {
      getItensLocal() 
  }, [])


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getItensLocal();
  }, []);
    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft: 45}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Itens</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Estes são os seus alimentos.</Text>
        <View style={{display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignSelf: 'center', padding: 10 }}>
          <Ionicons onPress={() => {setOpacity1(0.81); navigate('AddItens'); setOpacity1(1);}} name='add' color={"#fff"} size={32} style={{opacity: opacity1}} />
          <Ionicons onPress={() => {setOpacity2(0.81); getItensFromWeb(); setOpacity1(1)}} name='download' color={"#fff"} size={32} style={{opacity: opacity2}}  />
          <Ionicons onPress={() => {setOpacity3(0.81); sync(); setOpacity3(1);}} name='sync' color={"#fff"} size={32} style={{opacity: opacity3}} />

        </View>
        <ScrollView style={{
          marginBottom: 93,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {
          itens !== undefined && itens !== null ? itens.map(item => {return (<ItemBox key={item._id} _id={item._id} nome={item.nome} validade={item.validade == '' || item.validade == ' ' || item.validade == null || item.validade == undefined ? null : item.validade} codigo={item.codigo}></ItemBox>)}) : null
        }
        </ScrollView>
      </View>
    );
  }

export default Itens;
