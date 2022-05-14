import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Perfil from './src/screens/Perfil';
import Itens from './src/screens/Itens';
import Receitas from './src/screens/Receitas';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Receitas'>
        
        <Tab.Screen name="Itens" component={Itens} options={{ headerShown: false }} />
        <Tab.Screen selected name="Receitas" component={Receitas} options={{ headerShown: false }} />
        <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}