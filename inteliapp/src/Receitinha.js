import * as React from 'react';

import axios from 'axios'
import { TextInput, Text, View, ScrollView, Button, Linking, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Receitinha({route}) {
    const [receitaCompleta, setReceitaCompleta] = React.useState();
    const [refreshing, setRefreshing] = React.useState(true);
    async function getReceita() {
        await axios.post(`https://backfreeze.herokuapp.com/api/receitas/receita`, {
            id: route.params.props._id
        }).then(res => {
            setReceitaCompleta(res.data.data.receita[0]);
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
        <Text style={{textAlign: 'center', fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>{route.params.props.nome}</Text>

        <ScrollView style={{ marginTop: 24, display: 'flex', marginBottom: 0, backgroundColor: 'black', height: '50%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          

        </ScrollView>
      </View>
    );
  }

export default Receitinha;
