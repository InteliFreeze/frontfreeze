import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Login';
import Main from './src/Main';
import AddItens from './src/AddItens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />

      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="AddItens" component={AddItens} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}