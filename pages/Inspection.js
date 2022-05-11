import React, { useState } from "react"
import { ScrollView, TouchableOpacity, Text, View } from "react-native"

import { css } from "../assets/css"

import { buildingPart } from "../data/buildingPart"
import { mastTransformer } from "../data/mastTransformer"

import { StartInspection } from "../components/StartInspection"
import { deepClone, getTypeIcon } from "../components/func"

export default function Inspection({ navigation, route }) {
  const [selectType, setSelectType] = useState(false)
  const bp = deepClone(buildingPart)
  const mt = deepClone(mastTransformer)
  const [dataQw, setDataQw] = useState()

  function closeStart(value) {
    // return console.log("close....")
    try {
      console.log("pre....", value)
      setSelectType(value)
    } catch (error) {
      console.log("error", error)
      console.log("after....")
    }
  }
  function FormSelectType({}) {
    return (
      <View>
        <Text style={css.main_head}>Тип осмотра: </Text>

        <TouchableOpacity
          style={css.typeInspBtn}
          onPress={() => {
            setSelectType("buildingPart")
            setDataQw(bp)
          }}
        >
          <Text style={css.typeInspBtn_text}>
            {getTypeIcon("buildingPart", "#4e5f68")} {buildingPart.name}
          </Text>
          <Text style={[css.textUnderline, css.colorBlack]}>в составе: </Text>
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
          style={css.typeInspBtn}
          onPress={() => {
            setSelectType("mastTransformer")
            setDataQw(mt)
          }}
        >
          <Text style={css.typeInspBtn_text}>
            {getTypeIcon("mastTransformer", "#4e5f68")} {mastTransformer.name}
          </Text>
          <Text style={[css.textUnderline, css.colorBlack]}>в составе: </Text>
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
          style={css.typeInspBtn}
          onPress={() => {
            setSelectType("measurements")
            setDataQw({})
          }}
        >
          <Text style={css.typeInspBtn_text}>
            {getTypeIcon("measurements", "#4e5f68")} БЛАНК ЗАМЕРОВ
          </Text>
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
