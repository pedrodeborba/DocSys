import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import FirstScreen from './src/pages/FirstScreen'
import Paciente from './src/pages/Paciente';
import Profissional from './src/pages/Profissional';
import Home from './src/pages/Home';
import Agendar from './src/pages/Agendar'
import Perfil from './src/pages/Perfil'

//Bottom Tab Navigator
const Tab = createBottomTabNavigator();

 export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Agendar" component={Agendar} options={{ headerShown: false }}/>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

//Sistema de Rotas
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Paciente" component={Paciente} options={{ headerShown: false }}/>
        <Stack.Screen name="Profissional" component={Profissional} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}