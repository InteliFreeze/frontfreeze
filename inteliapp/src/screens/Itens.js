import * as React from 'react';

import axios from 'axios'
import { RefreshControl, Text, View, ScrollView } from 'react-native';

import ItemBox from '../utils/ItemBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Itens({navigation: {navigate}}) {
  const [itens, setItens] = React.useState([]);

  async function getItens () {
    const t = await AsyncStorage.getItem('token');
    console.log(`https://backfreeze.herokuapp.com/api/users/${t}/`)
    await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(res => {
      setItens(res.data.data.User[0].items)
      setRefreshing(false);
    })
    .catch(err => {
      console.log(err)
    })
  }

  React.useEffect(() => {

      getItens() 
    
  }, [])

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getItens();
  }, []);
    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Itens</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Estes são os seus alimentos.</Text>
        <View style={{}}>
          <Ionicons onPress={() => navigate('AddItens')} name='add' color={"#fff"} size={32} />
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
          itens !== undefined ? itens.map(item => {return (<ItemBox key={item._id} _id={item._id} nome={item.nome} validade={item.validade} codigo={item.codigo}></ItemBox>)}) : null
        }
        </ScrollView>
      </View>
    );
  }

export default Itens;
