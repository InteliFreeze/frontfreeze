import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text, View } from 'react-native';

import LoginPage from './screens/LoginPage';


export default function Login ({ navigation: { navigate } }) {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: '#000345' }}
        >
        <Tab.Screen name="LoginPage" component={LoginPage} options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused,color, size }) => (
            <Ionicons name="person-circle-outline" color={focused?"#000345":"#7A7A7A"} size={focused?45:32} />
            
            ), 
            tabBarLabel:({ focused,color })=>(<Text style={{color:"#000345", fontSize:focused?16:0, paddingBottom:16}}>Login</Text>),
            tabBarStyle: {
              backgroundColor: '#000345',
              borderTopColor: '#000345',
              height: 0,
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
              position: 'absolute',
            }
            }}  />
        </Tab.Navigator>
    );
    
}