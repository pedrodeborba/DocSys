import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Icones
import { Ionicons } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";

//Screens
import Login from "../pages/Login";
import Home from "../pages/Home";
import Schedule from "../pages/Schedule";
import Profile from "../pages/Profile";
import Weather from "../pages/Weather";

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
        component={Schedule}
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
        component={Profile}
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
      <Stack.Navigator initialRouteName="Weather">
        <Stack.Screen
          name="Login"
          component={Login}
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
        <Stack.Screen
          name="Weather"
          component={Weather}
          key="weather_screen"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}