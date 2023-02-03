import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Principal from "../screens/Principal";
import DadosProduto from "../screens/DadosProduto";

const Tab = createNativeStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Principal"
          component={Principal}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="DadosProduto"
          component={DadosProduto}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
