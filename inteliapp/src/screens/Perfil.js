import { Text, View, Button } from 'react-native';

import CustomizedTokenField from '../utils/CustomizedTokenField';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Perfil({ navigation: { navigate } }) {
    async function deleteToken () {
        await AsyncStorage.setItem('token', '');
        navigate('Login');
    }
    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45, width: '90%'}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Perfil</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Gerencie a sua sessão.</Text>
        <CustomizedTokenField></CustomizedTokenField>

        <View style={{
          height: 60,
          width: '50%',
          backgroundColor: '#C10000',
          padding: 12,
          marginTop: 14,
          borderTopRightRadius: 32,
          borderTopLeftRadius: 64,
          borderBottomRightRadius: 64,
          borderBottomLeftRadius: 32,
        }}>
            <Button onPress={deleteToken} title='Sair' color='#C10000'></Button>
        </View>

      </View>
    );
  }

export default Perfil;