import * as React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Linking, Button, TextInput, Alert } from 'react-native';
import { format } from 'date-fns';
import axios from 'axios';

function ItemBox(props) {
    const [opacity, setOpacity] = React.useState(1);
    const [opacity2, setOpacity2] = React.useState(1);

    const [rerender, setRerender] = React.useState('flex');
    async function deleteItem (codigo) {
        const itensStorage = await AsyncStorage.getItem('itens');
        let itensArray = JSON.parse(itensStorage);
        let itensArrayDeleted = itensArray.filter(item => item.codigo !== codigo);
        await AsyncStorage.setItem('itens', JSON.stringify(itensArrayDeleted)).then(async () => {
            Alert.alert('Item deletado!');
            setRerender('none') 

            await axios.delete(`https://backfreeze.herokuapp.com/api/users/usertoken/${codigo}`).then(res => {
                Alert.alert('Sincronizado!');

            }).catch(err => {
                Alert.alert('Você não está conectado!');
            })
        });
        
    }

    const onPress = async () => {
        const url = `https://cosmos.bluesoft.com.br/produtos/${props.codigo}`;
        await Linking.canOpenURL(url);
        Linking.openURL(url);
    };

    const [nome, setNome] = React.useState(props.nome);

    async function updateNome (name, codigo) {
        const t = await AsyncStorage.getItem('token');
        
        const itensLocal = await AsyncStorage.getItem('itens');
        let itens = JSON.parse(itensLocal);
        itens.filter(item => {
            if (item.nome == props.nome) {
                item.nome = nome;
            }
        });

        await AsyncStorage.setItem('itens', JSON.stringify(itens)).then(async () => {
            await axios.patch(`https://backfreeze.herokuapp.com/api/users/${t}/`, {
                items: itens
            }, {
                headers: {
                    'Content-Type': 'application/json'
              }
            }).then(res => {
              Alert.alert('Sincronizado!');
            }).catch(err => {
              Alert.alert('Você está offline!');
            })
        }).catch(err => {
            Alert.alert("Erro ao atualizar o nome!");
        })
    }
    
    const [codigo, setCodigo] = React.useState(props.codigo);

    async function updateCodigo () {
        const t = await AsyncStorage.getItem('token');
        
        const itensLocal = await AsyncStorage.getItem('itens');
        let itens = JSON.parse(itensLocal);
        itens.filter(item => {
            if (item.codigo == props.codigo) {
                item.codigo = codigo;
            }
        });

        await AsyncStorage.setItem('itens', JSON.stringify(itens)).then(async () => {
            await axios.patch(`https://backfreeze.herokuapp.com/api/users/${t}/`, {
                items: itens
            }, {
                headers: {
                    'Content-Type': 'application/json'
              }
            }).then(res => {
              Alert.alert('Sincronizado!');
            }).catch(err => {
              Alert.alert('Você está offline!');
            })
        }).catch(err => {
            Alert.alert("Erro ao atualizar o codigo de barras!");
        })
    }
    
    const [validade, setValidade] = React.useState(props.validade);

    async function updateValidade (name) {
        const t = await AsyncStorage.getItem('token');
        
        const itensLocal = await AsyncStorage.getItem('itens');
        let itens = JSON.parse(itensLocal);
        itens.filter(item => {
            if (item.validade == props.validade) {
                let diaMesAno = validade.split('/');
                let validadeParaRequest = (diaMesAno[2] + '-' + diaMesAno[1] + '-' + diaMesAno[0] + 'T15:00:00.000Z');
                item.validade = validadeParaRequest;
            }
        });

        await AsyncStorage.setItem('itens', JSON.stringify(itens)).then(async () => {
            await axios.patch(`https://backfreeze.herokuapp.com/api/users/${t}/`, {
                items: itens
            }, {
                headers: {
                    'Content-Type': 'application/json'
              }
            }).then(res => {
              Alert.alert('Sincronizado!');
            }).catch(err => {
              Alert.alert('Você está offline!');
            })
        }).catch(err => {
            Alert.alert("Erro ao atualizar a validade!");
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
            display: rerender,
            opacity: opacity
        }}
        onTouchStart={() => {setOpacity(0.9), setTimeout(() => {setOpacity(1)}, 200)}}
        >
            <View 
            style={{
                height: 60,
                width: 285,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <TextInput onChangeText={(input) => {setCodigo(input)}} onBlur={() => updateCodigo()} style={{ height: 'auto', fontSize: 20, color: "#494B7A", fontWeight: 'bold', textAlign: 'center', backgroundColor: '#fff', paddingLeft: 6, paddingRight: 6, borderRadius: 10}}>{props.codigo}</TextInput>
                <Ionicons onPress={() => {deleteItem(props.codigo)}} name='close' color={"#494B7A"} size={24} />

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
                <TextInput onChangeText={(input) => {setNome(input)}} onBlur={() => updateNome()} style={{ marginLeft: 3, fontSize: 16, color: "#282B65", fontWeight: 'bold', paddingLeft: 6, paddingRight: 6, backgroundColor: '#ffff', textAlign: 'center', borderRadius: 10 }}>{props.nome}</TextInput>
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
                <TextInput onChangeText={(input) => {setValidade(input)}} onBlur={() => updateValidade()} style={{ fontSize: 16, color: "#282B65", fontWeight: 'bold', paddingLeft: 6, paddingRight: 6, textAlign: 'center', marginTop: 3, backgroundColor: '#fff', borderRadius: 10 }}>{props.validade == null ? "Sem data de validade" : format(new Date(props.validade), 'dd/MM/yyyy')}</TextInput>
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
                alignItems: 'center',
                justifyContent: 'center',
                opacity: opacity2
            }}
            onTouchStart={() => {setOpacity2(0.9); setTimeout(() => {setOpacity2(1)}, 200)}}
            onTouchEndCapture={onPress}
            >
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', padding: 6}}>Fabricante</Text>
                <Ionicons name='link' color={"#ffffff"} size={18} />
            </View>
            
            
        </View>
    );
  }

export default ItemBox;