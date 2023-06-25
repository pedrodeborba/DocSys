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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Paciente" component={Paciente} options={{ headerShown: false }}/>
      <Stack.Screen name="Profissional" component={Profissional} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
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