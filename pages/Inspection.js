import React, { useState } from "react"
import { ScrollView, TouchableOpacity, Text, View } from "react-native"
import { Checkbox } from "react-native-paper"

import { css } from "../assets/css"

import { buildingPart } from "../data/buildingPart"
import { mastTransformer } from "../data/mastTransformer"

import { Question } from "../components/Question"
import { Measurements } from "../components/Measurements"

export default function Inspection({}) {
  const [selectType, setSelectType] = useState("")

  function closeStart(value) {
    setSelectType(value)
  }

  function StartInspection({ type }) {
    console.log("type", type)
    if (type == "buildingPart")
      return <Question dataQuests={buildingPart} closeStart={closeStart} />
    if (type == "mastTransformer")
      return <Question dataQuests={mastTransformer} closeStart={closeStart} />
    if (type == "measurements") return <Measurements closeStart={closeStart} />
    return <Text>ничего не выбрано!</Text>
  }

  function FormSelectType({}) {
    return (
      <View>
        <Text>Выберите тип осмотра: </Text>

        <TouchableOpacity
          style={css.touchBtn}
          onPress={() => setSelectType("buildingPart")}
        >
          <Text>{buildingPart.name}</Text>
          <Text style={css.textUnderline}>в составе: </Text>
          <Text style={css.touchBtn_title}>
            {buildingPart.headers[0].title}
          </Text>
          <Text style={css.touchBtn_title}>
            {buildingPart.headers[1].title}
          </Text>
          <Text style={css.touchBtn_title}>
            {buildingPart.headers[2].title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={css.touchBtn}
          onPress={() => setSelectType("mastTransformer")}
        >
          <Text>{mastTransformer.name}</Text>
          <Text style={css.textUnderline}>в составе: </Text>
          <Text style={css.touchBtn_title}>
            {mastTransformer.headers[0].title}
          </Text>
          <Text style={css.touchBtn_title}>
            {mastTransformer.headers[1].title}
          </Text>
          <Text style={css.touchBtn_title}>
            {mastTransformer.headers[2].title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={css.touchBtn}
          onPress={() => setSelectType("measurements")}
        >
          <Text>Бланк замеров</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={css.pages}>
      {selectType == false ? (
        <FormSelectType />
      ) : (
        <StartInspection type={selectType} />
      )}
    </ScrollView>
  )
}

// мутировать или не мутировать стейт

// onItemHintClick = (index, e) =>

//   this.setState(({ items }) => ({
//     items: [
//       ...items,
//       [index]: {
//         ...items[index],
//         htogle: !items[index].htogle,
//       },
//     ],
//   }));
