import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Text, View, ScrollView, RefreshControl } from 'react-native';

import ReceitaBox from '../utils/ReceitaBox';
import translate from 'translate-google-api';

function Receitas({navigation: {navigate}}) {
    const [ receitas, setReceitas ] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(true);

    async function getReceitas() {
      const t = await AsyncStorage.getItem('token');
      await axios.post(`https://backfreeze.herokuapp.com/api/receitas`, {
        
        ingredientes: "presunto,queijo,sal,pão,margarina,requeijão,água,sopa de cebola,salsa,pimentão verde,água",
        validades: "2022-04-30,2022-04-30,2022-05-10,2022-04-30"
        
      }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
          setReceitas(res.data.data.resposta);
          
          setRefreshing(false)
          
      }).catch(err => {
          alert('Erro ao buscar receitas!');
          setRefreshing(false)
      });
    }

    React.useEffect(() => {
      getReceitas();
    }, []);
    

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getReceitas();
    }, []);

    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Olá!</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Qual a receita perfeita para hoje?</Text>

        <ScrollView style={{marginBottom: 93,}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {
          receitas !== undefined ? receitas.map(receita => {console.log(receita); return (<ReceitaBox key={receita._id} nome={receita.nome} naGeladeiraPorcentagem={receita.porcentagemNaGeladeira} emVencimento={receita.itemsEmVencimento} navigate={navigate} _id={receita._id} itemsEmVencimentoNaGeladeira={receita.itemsEmVencimentoNaReceita} itemsFaltantes={receita.itemsFaltantes}></ReceitaBox>)}) : null
          }

        </ScrollView>
      </View>
    );
  }

export default Receitas;