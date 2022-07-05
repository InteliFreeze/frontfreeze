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

      let ingredientes;
      let nomes = [];
      let validades = [];

      await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(res => {
        ingredientes = res.data.data.User[0].items;
             
        ingredientes.forEach(element => {
          nomes.push(element.nome);
          validades.push(element.validade);
        });    
      }).catch(err => {
        alert("Não foi possível carregar as receitas!");
      });
      await axios.post("https://backfreeze-ocr.herokuapp.com/img_to_str", {
              "base64_img":
            "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"
          }).then(res => {
            console.log(res)
          })    
      nomes.forEach(element => {
        element = element.toLowerCase();
      });
      nomes = nomes.join(',')
      
      validades = validades.join(',');

      await axios.post(`https://backfreeze.herokuapp.com/api/receitas`, {
        
        ingredientes: nomes,
        validades: validades,
        
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
          receitas !== undefined ? receitas.map(receita => {return (<ReceitaBox key={receita._id} nome={receita.nome} naGeladeiraPorcentagem={receita.porcentagemNaGeladeira} emVencimento={receita.itemsEmVencimento} navigate={navigate} _id={receita._id} itemsEmVencimentoNaGeladeira={receita.itemsEmVencimentoNaReceita} itemsFaltantes={receita.itemsFaltantes}></ReceitaBox>)}) : null
          }


        </ScrollView>
      </View>
    );
  }

export default Receitas;