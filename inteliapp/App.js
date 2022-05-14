import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FaAccusoft } from 'react-icons/fa';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';

import Perfil from './src/screens/Perfil';
import Itens from './src/screens/Itens';
import Receitas from './src/screens/Receitas';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer backgroundColor='black'>
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
          <Ionicons name="book-outline" color={focused?"#000345":"#7A7A7A"} size={focused?45:32} style={
            {
              transition: 'all 0.5s ease-in-out',
            }
          } />
          
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
    </NavigationContainer>
  );
}