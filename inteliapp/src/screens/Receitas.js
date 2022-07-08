import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import axios from 'axios';
import { Text, View, ScrollView, RefreshControl } from 'react-native';

import ReceitaBox from '../utils/ReceitaBox';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Receitas({navigation: {navigate}}) {
    const notificationListener = React.useRef();
    const [notification, setNotification] = React.useState(false);
    const responseListener = React.useRef();
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
          nomes.push((element.nome).toLowerCase());
          validades.push(element.validade);
        });    
      }).catch(err => {
        alert("Não foi possível carregar as receitas!");
      });
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
      
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    React.useEffect(() => {
      Notifications.cancelAllScheduledNotificationsAsync().then(async () => {
        await schedulePushNotification();
    })
    }, [refreshing])
    

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

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete! 📬",
        body: 'Que tal dar uma olhadinha nas receitas?',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 600 },
    });
  }
