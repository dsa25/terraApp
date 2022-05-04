import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View, Text } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import Home from "./pages/Home"
import Inspection from "./pages/Inspection"
import Settings from "./pages/Settings"
import { css } from "./assets/css"

export default function App() {
  // const [myName, setMyName] = useState("")

  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer style={{ borderWidth: 1 }}>
      <View style={css.header}>
        <Text style={css.logo}>Terra</Text>
      </View>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerTitle: "main header",
          headerTitleStyle: {
            color: "blue",
            display: "none",
          },
          headerStyle: {
            height: 0,
          },
        }}
      >
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Настройки",
            tabBarLabelStyle: { display: "none" },
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          style={css.oh}
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Главная",
            tabBarLabelStyle: { display: "none" },
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="bars" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Inspection"
          component={Inspection}
          options={{
            tabBarLabel: "Осмотр",
            tabBarLabelStyle: { display: "none" },
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="plus" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// const [navigate, setNavigate] = useState([
//   { btn: "btn1", component: <Home /> },
//   { btn: "btn2", component: <Inspection /> },
//   { btn: "btn3", component: <Settings /> },
// ])
// const [indexMenu, setIndexMenu] = useState(0)

// function ListComponents() {
//   const result = navigate.map((item, index) => (
//     <View key={index} style={{}}>
//       {indexMenu == index && item.component}
//     </View>
//   ))
//   return result
// }

// function ListMenuItem() {
//   const result = navigate.map((item, index) => (
//     <TouchableOpacity
//       key={index}
//       style={css.menu_item}
//       onPress={() => {
//         setIndexMenu(index)
//       }}
//     >
//       <Text style={{ color: indexMenu == index ? "red" : "gray" }}>
//         {item.btn}
//       </Text>
//     </TouchableOpacity>
//   ))
//   return result
// }

// return (
//   <View style={{ flex: 1 }}>
//     <View>
//       <Text>Terra</Text>
//     </View>
//     <ListComponents />
//     <View style={css.menu}>
//       <ListMenuItem />
//     </View>
//   </View>
// )
