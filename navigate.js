import React from "react"
import Main from "./pages/Home"
import Inspection from "./pages/Inspection"

import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator()

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "Главная" }}
        />
        <Stack.Screen
          name="Inspection"
          component={Inspection}
          options={{ title: "Осмотр" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
