import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Login';
import Main from './src/Main';
import AddItens from './src/AddItens';
import Receitinha from './src/Receitinha';
import CameraBarCode from './src/CameraBarCode';
import CameraValidade from './src/CameraValidade';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />

      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="AddItens" component={AddItens} />
      <Stack.Screen options={{ headerShown: false }} name="Receitinha" component={Receitinha} />
      <Stack.Screen options={{ headerShown: false }} name="CameraBarCode" component={CameraBarCode} />
      <Stack.Screen options={{ headerShown: false }} name="CameraValidade" component={CameraValidade} />

    </Stack.Navigator>
    </NavigationContainer>
  );
}