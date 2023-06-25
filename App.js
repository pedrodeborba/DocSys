import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './src/pages/FirstScreen'
import Paciente from './src/pages/Paciente';
import Profissional from './src/pages/Profissional';
import Home from './src/pages/Home';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="Paciente" component={Paciente} />
      <Stack.Screen name="Profissional" component={Profissional} />
      <Stack.Screen name="Home" component={Home} /> 
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}