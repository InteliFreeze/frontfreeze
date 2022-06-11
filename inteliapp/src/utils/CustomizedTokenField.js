import { Text, View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomizedTokenField() {
    const [token, setToken] = React.useState('');

    async function getToken() {
        const t = await AsyncStorage.getItem('token');
        setToken(t);
    }
    React.useEffect(() => {
        getToken();
    }, []);
    return (
      <View style={{
        height: 'auto',
        width: 285,
        backgroundColor: '#B4C9FF',
        padding: 24,
        marginTop: 32,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 64,
        borderBottomRightRadius: 64,
        borderBottomLeftRadius: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 20, color: "#000345", fontWeight: 'bold' }}>Seu token:</Text>
        <Text style={{ fontSize: 16, color: "#282B65", fontWeight: 'bold', paddingLeft: 12, paddingRight: 64 }}>{token}</Text>
      </View>
    );
  }

export default CustomizedTokenField;