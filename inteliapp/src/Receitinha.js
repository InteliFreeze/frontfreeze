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
    async function navigateToCookbook () {
        const url = receitaCompleta.link
        await Linking.canOpenURL(url);
        Linking.openURL(url);
    }
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

        {/* <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'auto',
                width: 'auto',
                backgroundColor: '#e70000',
                padding: 12,
                marginBottom: 12,
                borderTopRightRadius: 32,
                borderTopLeftRadius: 64,
                borderBottomRightRadius: 64,
                borderBottomLeftRadius: 32,
            }}>
                <Button onPress={navigateToCookbook} title='COOKBOOK' color='#e70000'></Button>
                <Ionicons name='pizza' color={"#ffffff"} size={18} />
            </View> */}
      </View>
    );
  }

export default Receitinha;
