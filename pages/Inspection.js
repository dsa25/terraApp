import React, { useState } from "react"
import { ScrollView, TouchableOpacity, Text, View } from "react-native"

import { css } from "../assets/css"

import { buildingPart } from "../data/buildingPart"
import { mastTransformer } from "../data/mastTransformer"

import { StartInspection } from "../components/StartInspection"
import { deepClone, getTypeIcon } from "../components/func"

export default function Inspection({ navigation, route }) {
  const [selectType, setSelectType] = useState("")
  const bp = deepClone(buildingPart)
  const mt = deepClone(mastTransformer)
  const [dataQw, setDataQw] = useState()

  function closeStart(value) {
    setSelectType(value)
  }
  function FormSelectType({}) {
    return (
      <View>
        <Text>Выберите тип осмотра: </Text>

        <TouchableOpacity
          style={css.touchBtn}
          onPress={() => {
            setSelectType("buildingPart")
            setDataQw(bp)
          }}
        >
          <Text>
            {getTypeIcon("buildingPart")} {buildingPart.name}
          </Text>
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
          onPress={() => {
            setSelectType("mastTransformer")
            setDataQw(mt)
          }}
        >
          <Text>
            {getTypeIcon("mastTransformer")} {mastTransformer.name}
          </Text>
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
          onPress={() => {
            setSelectType("measurements")
            setDataQw({})
          }}
        >
          <Text>{getTypeIcon("measurements")} БЛАНК ЗАМЕРОВ</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={css.pages}>
      {selectType ? (
        <StartInspection
          mode={"add"}
          type={selectType}
          dataQuests={dataQw}
          closeStart={closeStart}
          navigation={navigation}
        />
      ) : (
        <FormSelectType />
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
