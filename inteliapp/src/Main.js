import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Perfil from './screens/Perfil';
import Itens from './screens/Itens';
import Receitas from './screens/Receitas';

export default function Main ({ navigation: { navigate } }) {
    const Tab = createBottomTabNavigator();
    const verifyToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token === null || token === '') {
            navigate('Login');
            alert('Insira o seu token para acessar as receitinhas.');
        }
    }
    React.useEffect(() => {
        verifyToken();
    }, []);
    
    return (
        <Tab.Navigator
        initialRouteName='Receitas'
        sceneContainerStyle={{ backgroundColor: '#000345' }}
        >
          
          <Tab.Screen name="Itens" component={Itens} options={{
            headerShown: false,
            tabBarIcon: ({ focused,color, size }) => (
            <Ionicons name="pricetags-outline" color={focused?"#000345":"#7A7A7A"} size={focused?45:32} />
            ), 
            tabBarLabel:({ focused,color })=>(<Text style={{color:"#000345", fontSize:focused?16:0, paddingBottom:16}}>Itens</Text>),
            tabBarStyle: {
              backgroundColor: '#ffffff',
              height: 96,
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
              position: 'absolute',
            }
          }} 
          />
          <Tab.Screen selected name="Receitas" component={Receitas} options={{
            headerShown: false,
            tabBarIcon: ({ focused,color, size }) => (
            <Ionicons name="book-outline" color={focused?"#000345":"#7A7A7A"} size={focused?45:32} />
            
            ), 
            tabBarLabel:({ focused,color })=>(<Text style={{color:"#000345", fontSize:focused?16:0, paddingBottom:16}}>Receitas</Text>),
            tabBarStyle: {
              backgroundColor: '#ffffff',
              height: 96,
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
              position: 'absolute',
            }
            }}  />
          <Tab.Screen name="Perfil" component={Perfil} options={{
            headerShown: false,
            tabBarIcon: ({ focused,color, size }) => (
            <Ionicons name="person-circle-outline" color={focused?"#000345":"#7A7A7A"} size={focused?45:32} />
            
            ), 
            tabBarLabel:({ focused,color })=>(<Text style={{color:"#000345", fontSize:focused?16:0, paddingBottom:16}}>Perfil</Text>),
            tabBarStyle: {
              backgroundColor: '#ffffff',
              height: 96,
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
              position: 'absolute',
            }
            }}  />
        </Tab.Navigator>
    );
}