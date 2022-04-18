import React, { useState } from "react"
import { View, TouchableOpacity, Text, TextInput } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { css } from "../assets/css"

const listInput = ["", "", "", "", "", "", "", "", "", ""]
const data = {
  header1: "Описание точки в которой производились замеры:",
  header2: "Показания измерений по напряжени, V",
  header3: "Показания измерений по силе тока, A",
  title1: "линейное",
  title2: "фазное",
  labels: [
    "A-B",
    "B-C",
    "C-A",
    "A-N",
    "B-N",
    "C-N",
    "Фаза A",
    "Фаза B",
    "Фаза C",
  ],
  inputs: [listInput.slice()],
  lastInput: "",
}

export function Measurements({ dataQuests, closeStart }) {
  const [index, setIndex] = useState(0)
  const [countPoint, setCountPoint] = useState(data.inputs.length)
  const [point, setPoint] = useState(data.inputs[index])
  const [measurs, setMeasurs] = useState(true)

  console.log(data.inputs)

  const changeText = (text, indexArr, indexInput) => {
    point[indexInput] = text
    data.inputs[indexArr][indexInput] = point[indexInput]
    setPoint([...point])
  }

  function checkEmpty(arr) {
    let result = false
    for (const item of arr) {
      if (item.trim().length == 0) {
        result = true
        break
      }
    }
    return result
  }

  return (
    <View>
      {measurs && (
        <View style={css.measurs}>
          {index > 0 && index + 1 == countPoint && (
            <TouchableOpacity
              style={[css.measurs_close]}
              onPress={() => {
                console.log(
                  "Вы точно хотите удалить точку: " +
                    countPoint +
                    ") " +
                    data.inputs[index][0]
                )
                data.inputs.pop()
                setIndex(index - 1)
                setCountPoint(data.inputs.length)
              }}
            >
              <AntDesign name="close" size={24} color="red" />
            </TouchableOpacity>
          )}
          <Text style={css.measurs_name}>
            <Text>
              {index + 1}/{countPoint + " "}
            </Text>
            Бланк замеров
          </Text>
          <Text style={css.measurs_header}>{data.header1}</Text>
          <TextInput
            style={css.measurs_fieldtext}
            multiline={true}
            // editable={props.check}
            value={data.inputs[index][0]}
            onChangeText={(text) => {
              changeText(text, index, 0)
            }}
          />
          <View>
            <Text style={css.measurs_header}>{data.header2}</Text>

            <Text style={css.measurs_title}>
              U<Text style={{ fontSize: 12 }}>{data.title1}</Text>
            </Text>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[0]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][1]}
                onChangeText={(text) => {
                  changeText(text, index, 1)
                }}
              />
            </View>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[1]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][2]}
                onChangeText={(text) => {
                  changeText(text, index, 2)
                }}
              />
            </View>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[2]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][3]}
                onChangeText={(text) => {
                  changeText(text, index, 3)
                }}
              />
            </View>

            <Text style={css.measurs_title}>
              U<Text style={{ fontSize: 12 }}>{data.title2}</Text>
            </Text>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[3]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][4]}
                onChangeText={(text) => {
                  changeText(text, index, 4)
                }}
              />
            </View>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[4]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][5]}
                onChangeText={(text) => {
                  changeText(text, index, 5)
                }}
              />
            </View>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[5]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][6]}
                onChangeText={(text) => {
                  changeText(text, index, 6)
                }}
              />
            </View>

            <Text style={css.measurs_header}>{data.header3}</Text>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[6]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][7]}
                onChangeText={(text) => {
                  changeText(text, index, 7)
                }}
              />
            </View>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[7]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][8]}
                onChangeText={(text) => {
                  changeText(text, index, 8)
                }}
              />
            </View>
            <View style={css.measurs_item}>
              <Text style={css.measurs_label}>{data.labels[8]}</Text>
              <TextInput
                style={css.measurs_input}
                value={data.inputs[index][9]}
                onChangeText={(text) => {
                  changeText(text, index, 9)
                }}
              />
            </View>
          </View>
        </View>
      )}

      {measurs == false && (
        <View>
          <Text>
            "Положение анцапфы (переключателя) силового трансформатора. При
            визуальной доступности!"
          </Text>
          <TextInput
            style={css.measurs_input}
            onChangeText={(text) => {
              data.lastInput = text
              console.log(data)
            }}
          />
        </View>
      )}

      {measurs && (
        <TouchableOpacity
          style={[css.touchBtn, css.btn_green, css.measurs_btnAdd]}
          onPress={() => {
            console.log("point", data.inputs[index])
            if (checkEmpty(data.inputs[countPoint - 1])) {
              console.log("не все поля заполнены!")
            } else {
              data.inputs.push(listInput.slice())
              setCountPoint(data.inputs.length)
              setIndex(index + 1)
            }
          }}
        >
          <Text style={{ color: "#fff" }}>Добавить точку</Text>
        </TouchableOpacity>
      )}

      <View style={[css.wr_btns, { paddingBottom: 30 }]}>
        <TouchableOpacity
          style={[css.touchBtn, css.btn_red, { marginRight: "auto" }]}
          onPress={() => {
            console.log("the end...")
          }}
        >
          <Text style={{ color: "#fff" }}>Завершить</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={css.touchBtn}
          onPress={() => {
            if (measurs == false) {
              setMeasurs(true)
              return
            }
            if (index > 0) {
              setIndex(index - 1)
            }
          }}
        >
          <Text>Назад</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[css.touchBtn, { marginLeft: 50 }]}
          onPress={() => {
            if (index + 1 < countPoint) {
              setIndex(index + 1)
            } else {
              if (checkEmpty(data.inputs[countPoint - 1])) {
                console.log("не все поля заполнены!")
              } else {
                setMeasurs(false)
              }
            }
          }}
        >
          <Text>Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
