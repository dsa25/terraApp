import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native"
import { css } from "../assets/css"

export default function Home() {
  const [inspection, setInpection] = useState([
    { id: 1, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 2, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 3, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 4, name: "Ivanov", text: "lorem slk 4", status: "done" },
    { id: 5, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 6, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 7, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 8, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 9, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 10, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 11, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 12, name: "Ivanov", text: "lorem slk", status: "done" },
    { id: 13, name: "Ivanov", text: "lorem slk 321", status: "done" },
    { id: 14, name: "Ivanov", text: "lorem slk 321", status: "done" },
    { id: 15, name: "Ivanov", text: "lorem slk 321", status: "done" },
    { id: 16, name: "Ivanov", text: "lorem slk 321", status: "done" },
    { id: 17, name: "Ivanov", text: "LAST 777", status: "done" },
  ])

  const [text, onChangeText] = useState("Useless Text")

  const Item = ({ name, text }) => (
    <View style={css.item}>
      <View style={css.item_item}>
        <Text style={{ fontSize: 26 }}>{name}</Text>
        <Text style={{ fontSize: 20 }}>{text}</Text>
        <TextInput style={css.input} onChangeText={onChangeText} value={text} />
      </View>
    </View>
  )

  const renderItem = ({ item }) => <Item name={item.name} text={item.text} />

  return (
    <ScrollView style={[css.pages]}>
      <FlatList
        numColumns={3}
        scrollEnabled={true}
        data={inspection}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  )
}
