import * as React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Linking, Button, TextInput } from 'react-native';
import { format } from 'date-fns';
import axios from 'axios';

function ItemBox(props) {
    const [rerender, setRerender] = React.useState('flex');
    function deleteItem (id) {
        axios.delete(`https://backfreeze.herokuapp.com/api/users/usertoken/${id}`).then(res => {
            setRerender('none')
        }).catch(err => {
            alert('Não foi possível deletar o item!')
        })
    }

    const onPress = async () => {
        const url = `https://cosmos.bluesoft.com.br/produtos/${props.codigo}`;
        await Linking.canOpenURL(url);
        Linking.openURL(url);
    };

    const [nome, setNome] = React.useState(props.nome);

    async function updateNome (name) {
        const t = await AsyncStorage.getItem('token');
        setNome(name);
        let itens = [];
        await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(res => {
          itens = JSON.parse(JSON.stringify(res.data.data.User[0].items));
        })
        .catch(err => {
          alert('Erro ao atualizar nome!');
        })

        itens.map(item => {
            if (item._id === props._id) {
                item.nome = nome;
            }
        })

        await axios.patch(`https://backfreeze.herokuapp.com/api/users/${t}/`, {
            items: itens
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
        }).catch(err => {
            alert('Erro ao atualizar nome!');
        })
    }
    
    const [codigo, setCodigo] = React.useState(props.codigo);

    async function updateCodigo (name) {
        const t = await AsyncStorage.getItem('token');
        setCodigo(name);
        let itens = [];
        await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(res => {
          itens = JSON.parse(JSON.stringify(res.data.data.User[0].items));
        })
        .catch(err => {
          alert('Erro ao atualizar codigo!');
        })

        itens.map(item => {
            if (item._id === props._id) {
                item.codigo = codigo;
            }
        })

        await axios.patch(`https://backfreeze.herokuapp.com/api/users/${t}/`, {
            items: itens
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
        }).catch(err => {
            alert('Erro ao atualizar codigo de barras!');
        })
    }
    
    const [validade, setValidade] = React.useState(props.validade);

    async function updateValidade (name) {
        const t = await AsyncStorage.getItem('token');
        setValidade(name);
        let itens = [];
        await axios.get(`https://backfreeze.herokuapp.com/api/users/${t}/`).then(res => {
          itens = JSON.parse(JSON.stringify(res.data.data.User[0].items));
        })
        .catch(err => {
          alert('Erro ao atualizar validade!');
        })

        itens.map(item => {
            if (item._id === props._id) {
                const data = validade.split('/');
                item.validade = new Date(data[2], data[1] - 1, data[0]);
            }
        })

        await axios.patch(`https://backfreeze.herokuapp.com/api/users/${t}/`, {
            items: itens
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            
        }).catch(err => {
            alert('Erro ao atualizar validade!');
            
        })
    }


    return (
        <View key={props._id}
        style={{
            height: 'auto',
            width: '100%',
            backgroundColor: '#B4C9FF',
            paddingBottom: 12,
            marginBottom: 12,
            marginTop: 12,
            borderTopRightRadius: 32,
            borderTopLeftRadius: 64,
            borderBottomRightRadius: 64,
            borderBottomLeftRadius: 32,
            paddingTop: 12,
            justifyContent: 'center',
            alignItems: 'center',
            display: rerender
        }}>
            <View 
            style={{
                height: 60,
                width: 285,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <TextInput onChangeText={(input) => {setCodigo(input)}} onBlur={() => updateCodigo()} style={{ fontSize: 20, color: "#494B7A", fontWeight: 'bold' }}>{props.codigo}</TextInput>
                <Ionicons onPress={() => {deleteItem(props._id)}} name='close' color={"#494B7A"} size={24} />

            </View>
            <View
            style={{
                height: 'auto',
                width: 285,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 24
            }}>
                <Text style={{ fontSize: 20, color: "#000345", fontWeight: 'bold' }}>Nome:</Text>
                <TextInput onChangeText={(input) => {setNome(input)}} onBlur={() => updateNome()} style={{ fontSize: 16, color: "#282B65", fontWeight: 'bold', paddingLeft: 12, paddingRight: 84 }}>{props.nome}</TextInput>
            </View>
            <View
            style={{
                height: 'auto',
                width: 285,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 24
            }}>
                <Text style={{ fontSize: 20, color: "#000345", fontWeight: 'bold' }}>Validade:</Text>
                <TextInput onChangeText={(input) => {setValidade(input)}} onBlur={() => updateValidade()} style={{ fontSize: 16, color: "#282B65", fontWeight: 'bold', paddingLeft: 12, paddingRight: 64 }}>{format(new Date(props.validade), 'dd/MM/yyyy')}</TextInput>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: 'auto',
                width: 'auto',
                backgroundColor: '#000345',
                padding: 12,
                marginTop: 12,
                borderTopRightRadius: 32,
                borderTopLeftRadius: 64,
                borderBottomRightRadius: 64,
                borderBottomLeftRadius: 32,
            }}>
                <Button onPress={onPress} title='Fabricante' color='#000345'></Button>
                <Ionicons name='link' color={"#ffffff"} size={18} />
            </View>
            
            
        </View>
    );
  }

export default ItemBox;