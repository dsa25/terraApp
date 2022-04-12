import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign } from "@expo/vector-icons"

import Home from "./pages/Home"
import Inspection from "./pages/Inspection"
import Settings from "./pages/Settings"
import { css } from "./assets/css"

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerTitle: "Terra",
          headerTitleStyle: {
            color: "blue",
          },
          headerStyle: {
            height: 50,
          },
        }}
      >
        <Tab.Screen
          name="Inspection"
          component={Inspection}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="plus" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          style={css.oh}
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="bars" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
