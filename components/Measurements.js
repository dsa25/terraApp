import React, { useState } from "react"
import { Alert, View, TouchableOpacity, Text, TextInput } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { css } from "../assets/css"
import { WrBtnThree } from "./WrBtnThree"

import { deepClone, checkEmpty, checkEmptyChild, checkOneChecked } from "./func"

import { delegationData } from "../data/delegationData"
import { Delegation } from "./Delegation"

import { measurData } from "../data/measurData"
const listInput = ["1", "2", "3", "4", "1", "1", "1", "1", "1", "1"]
measurData.inputs[0] = listInput.slice()

export function Measurements({ closeStart }) {
  const doneList = {}
  doneList.type = "measurements"
  const [index, setIndex] = useState(0)
  const [countPoint, setCountPoint] = useState(measurData.inputs.length)
  const [point, setPoint] = useState(measurData.inputs[index])
  const [measurs, setMeasurs] = useState(true)

  const [typeContent, setTypeContent] = useState("delegation")
  const [dataDelegation, setDataDelegation] = useState(
    deepClone(delegationData)
  )
  function getDataDelegation(data) {
    setDataDelegation(data)
    console.log("getData", data)
  }

  console.log("measurData", measurData)

  const fCancel = () => {
    closeStart(false)
    setDataDelegation(deepClone(delegationData))
  }

  function fBack() {
    if (typeContent == "measurements") {
      if (measurs == false) {
        setMeasurs(true)
        return
      }
      if (index > 0) {
        setIndex(index - 1)
      } else {
        setTypeContent("delegation")
      }
      return
    }
  }

  function fNext() {
    if (typeContent == "delegation") {
      if (!dataDelegation || checkEmptyChild(dataDelegation.fields)) {
        Alert.alert("Не заполнены поля!")
        alert("Не заполнены поля!")
        return
      }
      if (checkOneChecked(dataDelegation.users.checkbox) == false) {
        Alert.alert("Не указан не одни сотрудник!")
        alert("Не указан не одни сотрудник!")
        return
      }
      setTypeContent("measurements")
      return
    }

    if (typeContent == "measurements") {
      if (measurs == false) {
        if (measurData.lastInput.trim() == "") {
          Alert.alert("Поле не заполнено!")
          alert("Поле не заполнено!")
        } else {
          doneList.delegation = dataDelegation
          doneList.measurements = measurData
          console.log("end")
          console.log("doneList", doneList)
        }
        return
      }
      if (index + 1 < countPoint) {
        setIndex(index + 1)
        return
      }
      if (index + 1 == countPoint) {
        if (checkEmpty(measurData.inputs[countPoint - 1])) {
          console.log("не все поля заполнены!")
        } else {
          setMeasurs(false)
        }
        return
      }
    }
  }

  function LabelInput({ indexArr, indexInput, input, label }) {
    const [value, setValue] = useState(input)
    if (indexInput == 0) {
      return (
        <View>
          <Text style={[css.measurs_header]}>{label}</Text>
          <TextInput
            style={css.measurs_fieldtext}
            multiline={true}
            // editable={props.check}
            value={measurData.inputs[index][0]}
            onChangeText={(text) => {
              setValue(text)
              measurData.inputs[indexArr][indexInput] = text
            }}
          />
        </View>
      )
    } else {
      return (
        <View style={css.measurs_item}>
          <Text style={css.measurs_label}>{label}</Text>
          <TextInput
            style={css.measurs_input}
            value={value}
            onChangeText={(text) => {
              setValue(text)
              measurData.inputs[indexArr][indexInput] = text
            }}
          />
        </View>
      )
    }
  }

  function ListLabelInput({ props }) {
    const result = props?.map((item, indexInput) => (
      <View key={indexInput}>
        {indexInput == 1 && (
          <Text style={css.measurs_header}>{measurData.header1}</Text>
        )}
        {indexInput == 1 && (
          <Text style={css.measurs_title}>
            U<Text style={{ fontSize: 12 }}>{measurData.title1}</Text>
          </Text>
        )}
        {indexInput == 4 && (
          <Text style={css.measurs_title}>
            U<Text style={{ fontSize: 12 }}>{measurData.title2}</Text>
          </Text>
        )}
        {indexInput == 7 && (
          <Text style={css.measurs_header}>{measurData.header2}</Text>
        )}
        <LabelInput
          indexArr={index}
          indexInput={indexInput}
          input={measurData.inputs[index][indexInput]}
          label={item}
        />
      </View>
    ))
    return result
  }

  function MeusurementBlock() {
    return (
      <View>
        {measurs && (
          <View style={css.measurs}>
            {index > 0 && index + 1 == countPoint && (
              <TouchableOpacity
                style={[css.measurs_close]}
                onPress={() => {
                  let msg =
                    "Вы точно хотите удалить точку: " +
                    countPoint +
                    ") " +
                    measurData.inputs[index][0]
                  console.log(msg)
                  Alert.alert("", msg, [
                    {
                      text: "Отмена",
                      onPress: () => {
                        console.log("click cancel")
                      },
                      style: "cancel",
                    },
                    {
                      text: "Да",
                      onPress: () => {
                        console.log("yes press")
                        measurData.inputs.pop()
                        setIndex(index - 1)
                        setCountPoint(measurData.inputs.length)
                      },
                    },
                  ])
                }}
              >
                <AntDesign name="close" size={24} color="red" />
              </TouchableOpacity>
            )}
            <Text style={[css.measurs_name]}>
              <Text>
                {index + 1}/{countPoint + " "}
              </Text>
              Бланк замеров
            </Text>

            <ListLabelInput props={measurData.labels} />
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
                measurData.lastInput = text
              }}
            />
          </View>
        )}
        {measurs && (
          <TouchableOpacity
            style={[css.touchBtn, css.btn_green, css.measurs_btnAdd]}
            onPress={() => {
              console.log("point", measurData.inputs[index])
              if (checkEmpty(measurData.inputs[countPoint - 1])) {
                console.log("не все поля заполнены!")
                Alert.alert("Не все поля заполнены!")
              } else {
                measurData.inputs.push(listInput.slice())
                setCountPoint(measurData.inputs.length)
                setIndex(index + 1)
              }
            }}
          >
            <Text style={{ color: "#fff" }}>Добавить точку</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <View>
      {typeContent == "delegation" && (
        <Delegation
          type={"measurements"}
          data={dataDelegation}
          getData={getDataDelegation}
        />
      )}
      {typeContent == "measurements" && <MeusurementBlock />}

      <WrBtnThree fCancel={fCancel} fBack={fBack} fNext={fNext} />
    </View>
  )
}
