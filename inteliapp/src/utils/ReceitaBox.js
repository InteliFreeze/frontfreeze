import * as React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Linking, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { format } from 'date-fns';
import axios from 'axios';

function ReceitaBox(props) {


    const [ porcentagem, setPorcentagem ] = React.useState()
    React.useEffect(() => {
        let text = `${props.naGeladeiraPorcentagem}`;
        text = text.split('.')[0]
        setPorcentagem(text);
    }, []);
    const onPress = async () => {
        props.navigate('Receitinha', {props});
    };
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
        }}>
            <Text style={{ textAlign: 'center', fontSize: 20, color: "#000345", fontWeight: 'bold' }}>{props.nome}</Text>

        <View style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            height: 'auto',
            width: 'auto',
            marginTop: 12
        }}>
            <Text style={{ fontSize: 16, color: "#494B7A", fontWeight: 'bold' }}>Na geladeira: </Text>
            <AnimatedCircularProgress
                size={45}
                width={5}
                fill={props.naGeladeiraPorcentagem}
                tintColor="#000345" 
                backgroundColor="#3d5875"
            >
                {
                    (fill) => (
                       <Text>
                         { porcentagem }%
                       </Text>
                    )
                }
            </AnimatedCircularProgress>


        </View>
        <View style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            height: 'auto',
            width: 'auto',
            marginTop: 12
        }}>
            <Text style={{ fontSize: 16, color: "#494B7A", fontWeight: 'bold' }}>Em vencimento: </Text>
            <Text style={{ fontSize: 20, color: "#494B7A", fontWeight: 'bold' }}>
                {props.emVencimento}
            </Text>


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
                <Button onPress={onPress} title='RECEITA' color='#000345'></Button>
                <Ionicons name='nutrition' color={"#ffffff"} size={18} />
            </View>
            
        </View>
    );
  }

export default ReceitaBox;