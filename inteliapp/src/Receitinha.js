import * as React from 'react';

import axios from 'axios'
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

function Receitinha({route}) {
    const [ingredientes, setIngredientes] = React.useState([]);	
    const [directions, setDirections ] = React.useState([]);	
    const [refreshing, setRefreshing] = React.useState(true);
    async function getReceita() {
        await axios.post(`https://backfreeze.herokuapp.com/api/receitas/receita`, {
            id: route.params.props._id
        }).then(res => {
            setIngredientes(((res.data.data.receita[0].ingredientes_medidas).split(',')));
            setDirections((res.data.data.receita[0].directions).replace(/"/g, '').replace(/\[/g, '').replace(/]/g, ''))
            setRefreshing(false);
        }).catch(err => {
            alert("Não foi possível carregar a receita!");
            setRefreshing(false);
        });
    }
    React.useEffect(() => {
        getReceita();
    }, [refreshing]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
      }, []);
  

    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45, backgroundColor: '#000345'}}>
        <Ionicons onPress={() => route.params.props.navigate('Receitas')} name='arrow-back' color={"#ffffff"} size={24} style={{ marginBottom: 24 }} />
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
           <Text style={{marginRight: '3%', textAlign: 'center', fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>{route.params.props.nome}</Text>
           <AnimatedCircularProgress
                size={45}
                width={5}
                fill={route.params.props.naGeladeiraPorcentagem}
                tintColor="#0010df" 
                backgroundColor="#000222"
            >
            </AnimatedCircularProgress>
        </View>

        <ScrollView style={{ marginTop: 32, display: 'flex', marginBottom: 0, height: '50%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <Text style={{marginBottom: 24, textAlign: 'left', fontSize: 18, color: "#ffffff", fontWeight:'bold' }}>ℹ️   Ingredientes:</Text>
        
          {
            ingredientes.map((item) => {
              return (
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: '3%',
                }}>
                  <Ionicons name='pricetag-outline' color={"#e8e8e8"} size={24} />
                  <Text key={item.replace(/"/g, '').replace('[', '').replace(']', '').trim()} style={{marginLeft: '3%', fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>{item.replace(/"/g, '').replace('[', '').replace(']', '').trim()}</Text>
                </View>
              )
            })
          }
        <Text style={{marginBottom: 24, marginTop: 24, textAlign: 'left', fontSize: 18, color: "#ffffff", fontWeight:'bold' }}>🍳   Modo de preparo:</Text>


          { 
            directions !== undefined ? (<Text style={{marginLeft: '3%', fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>{directions}</Text>) : null
          }

        <Text style={{marginBottom: 24, marginTop: 24, textAlign: 'left', fontSize: 18, color: "#ffffff", fontWeight:'bold' }}>♥   Itens aproveitados:</Text>

        {
          route.params.props.itemsEmVencimentoNaGeladeira.map((item) => {
            return (<View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '3%',
            }}>
              <Ionicons name='pricetag-outline' color={"#e8e8e8"} size={24} />
              <Text key={item.replace(/"/g, '').replace('[', '').replace(']', '').trim()} style={{marginLeft: '3%', fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>{item}</Text>
            </View>)
          })
        }
          

        </ScrollView>
      </View>
    );
  }

export default Receitinha;
