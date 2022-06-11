import * as React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, TextInput, ProgressViewIOSComponent } from 'react-native';
import { format } from 'date-fns';
import axios from 'axios';

function ItemBox(props) {
    const [rerender, setRerender] = React.useState('flex');
    function deleteItem (id) {
        axios.delete(`https://backfreeze.herokuapp.com/api/users/usertoken/${id}`).then(res => {
            setRerender('none')
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <View key={props._id}
        style={{
            height: 'auto',
            width: 285,
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
                <Text style={{ fontSize: 20, color: "#494B7A", fontWeight: 'bold' }}>{props.codigo}</Text>
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
                <Text style={{ fontSize: 16, color: "#282B65", fontWeight: 'bold', paddingLeft: 12, paddingRight: 84 }}>{props.nome}</Text>
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
                <Text style={{ fontSize: 16, color: "#282B65", fontWeight: 'bold', paddingLeft: 12, paddingRight: 64 }}>{format(new Date(props.validade), 'dd/MM/yyyy')}</Text>
            </View>
            
            
        </View>
    );
  }

export default ItemBox;