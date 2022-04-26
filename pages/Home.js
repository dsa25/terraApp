import React, { useState } from "react"
import { TextInput, Text, TouchableOpacity, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { css } from "../assets/css"

export default function Home() {
  const [inspection, setInpection] = useState()

  const [input, setInput] = useState("123")

  const setData = async (value) => {
    try {
      await AsyncStorage.setItem("test", value)
    } catch (error) {
      console.log("cathc error", error)
    }
  }

  const getData = async () => {
    try {
      const val = await AsyncStorage.getItem("test321")
      console.log("null", val)
      if (val !== null) {
        console.log("val", val)
      }
    } catch (error) {
      console.log("cathc error", error)
    }
  }

  return (
    <ScrollView style={[css.pages]}>
      <TextInput
        style={{ borderWidth: 1, margin: 20 }}
        value={input}
        onChangeText={(text) => {
          setInput(text)
        }}
      />
      <TouchableOpacity
        style={{ borderWidth: 1, padding: 5, width: 100 }}
        onPress={() => {
          setData(input)
        }}
      >
        <Text>click set</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ borderWidth: 1, padding: 5, width: 100, marginTop: 50 }}
        onPress={getData}
      >
        <Text>click get</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
