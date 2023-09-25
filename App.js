import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Icones
import { Ionicons } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";

//Screens
import FirstScreen from "./src/pages/FirstScreen";
import Paciente from "./src/pages/Paciente";
import Profissional from "./src/pages/Profissional";
import Home from "./src/pages/Home";
import Agendamento from "./src/pages/Agendamento";
import Perfil from "./src/pages/Perfil"

//Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#D8DDFC",
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          left: 10,
          right: 10,
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size, focused }) => {
            //Se estiver na tela o focused = true, já em outra tela focused = false.
            if (focused) {
              // Se estiver na tela...
              return <Ionicons name="home" size={size} color={"#6F7BF7"} />;
            } else
              return (
                <Ionicons name="home-outline" size={size} color={"#6F7BF7"} />
              );
          },
        }}
      />

      <Tab.Screen
        name="Agendamento"
        component={Agendamento}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size, focused }) => {
            //Se estiver na tela o focused = true, já em outra tela focused = false.
            if (focused) {
              // Se estiver na tela...
              return (
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={size}
                  color={"#6F7BF7"}
                />
              );
            } else
              return (
                <MaterialCommunityIcons
                  name="calendar-plus"
                  size={size}
                  color={"#6F7BF7"}
                />
              );
          },
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size, focused }) => {
            //Se estiver na tela o focused = true, já em outra tela focused = false.
            if (focused) {
              // Se estiver na tela...
              return <Ionicons name="person" size={size} color={"#6F7BF7"} />;
            } else
              return (
                <Ionicons name="person-outline" size={size} color={"#6F7BF7"} />
              );
          },
        }}
      />
    </Tab.Navigator>
  );
}

//Função principal + Sistema de Rotas
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Paciente"
          component={Paciente}
          options={{ 
            headerShown: false,
            animationEnabled: true, 
          }}
        />
        <Stack.Screen
          name="Profissional"
          component={Profissional}
          options={{ 
            headerShown: false,
            animationEnabled: true, 
          }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
