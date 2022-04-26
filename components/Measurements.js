import React, { useState } from "react"
import { View, TouchableOpacity, Text, TextInput } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { css } from "../assets/css"
import { WrBtnThree } from "./WrBtnThree"

import {
  deepClone,
  checkEmpty,
  checkEmptyChild,
  alertSelection,
  alertMsg,
  addItemInspectionHistory,
  setDoneList,
  isEmpty,
  goHomeAfterSave,
} from "./func"

import { delegationData } from "../data/delegationData"
import { Delegation } from "./Delegation"

import { measurData } from "../data/measurData"
const listInput = ["1", "2", "3", "4", "1", "1", "1", "1", "1", "1"]
measurData.inputs = [listInput.slice()]

export function Measurements({
  call,
  typeQuest,
  getDD,
  dataQuests,
  closeStart,
  navigation,
}) {
  const doneList = {}
  const [index, setIndex] = useState(0)
  const [countPoint, setCountPoint] = useState(measurData.inputs.length)
  const [point, setPoint] = useState(measurData.inputs[index])
  const [measurs, setMeasurs] = useState(true)

  const [typeContent, setTypeContent] = useState(
    call == "two" ? "measurements" : "delegation"
  )
  const [dataDelegation, setDataDelegation] = useState(
    deepClone(delegationData)
  )
  function getDataDelegation(data) {
    setDataDelegation(data)
  }

  function clearInputs() {
    measurData.inputs = [listInput.slice()]
    measurData.lastInput = ""
  }

  const fCancel = () => {
    if (call == "two") {
      alertSelection(
        "Вы точно хотите завершить замеры?",
        "Указанные замеры будут удалены и вернетесь к осмотру",
        {
          text: "Да",
          func: () => {
            clearInputs()
            closeStart()
          },
        },
        {
          func: () => console.log("click cancel"),
          text: "Отмена",
        }
      )
      return
    }

    alertSelection(
      "Вы точно хотите завершить замеры?",
      "Указанные данные будут удалены!",
      {
        text: "Да",
        func: () => {
          clearInputs()
          closeStart(false)
          setDataDelegation(deepClone(delegationData))
        },
      },
      {
        func: () => console.log("click cancel"),
        text: "Отмена",
      }
    )
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
        if (call == "one") setTypeContent("delegation")
      }
      return
    }
  }

  async function fNext() {
    if (typeContent == "delegation") {
      if (!dataDelegation || checkEmptyChild(dataDelegation.fields)) {
        alertMsg("Не все поля заполнены!")
        return
      }
      if (isEmpty(dataDelegation.users.master)) {
        alertMsg("Не указан мастер!")
        return
      }
      if (dataDelegation.users.other.length == 0) {
        alertMsg("Не указан электромонтер!")
        return
      }
      setTypeContent("measurements")
      return
    }

    if (typeContent == "measurements" || typeContent == "quest") {
      if (measurs == false) {
        if (measurData.lastInput.trim() == "") {
          alertMsg("Поле не заполнено!")
        } else {
          if (call == "one") {
            let itemHistory = {
              id: "__",
              v: 1,
              date: dataDelegation.date,
              address: dataDelegation.fields[1].input,
              fio: dataDelegation.users.master.fio,
              key: "key_" + Date.now(),
              status: "local",
              type: "measurements",
              measur: false,
            }
            await addItemInspectionHistory(itemHistory)
            doneList.type = "measurements"
            doneList.delegation = dataDelegation
            doneList.measurements = measurData
            await setDoneList(itemHistory.key, doneList)
            clearInputs()
            setDataDelegation(deepClone(delegationData))
            closeStart(false)
            console.log("doneList", doneList)
            await goHomeAfterSave(navigation)
          }
          if (call == "two") {
            console.log("dataQuests", dataQuests)
            let itemHistory = {
              id: "__",
              v: 1,
              date: getDD.date,
              address: getDD.fields[1].input,
              fio: getDD.users.master.fio,
              key: "key_" + Date.now(),
              status: "local",
              type: dataQuests.type,
              measur: true,
            }
            await addItemInspectionHistory(itemHistory)
            doneList.type = typeQuest
            doneList.measur = true
            doneList.delegation = getDD
            doneList.quests = dataQuests
            doneList.measurements = measurData
            await setDoneList(itemHistory.key, doneList)
            alertMsg("Успешно!")
            clearInputs()
            setDataDelegation(deepClone(delegationData))
            closeStart("exit")
            console.log("doneList", doneList)
            await goHomeAfterSave(navigation)
          }
        }
        return
      }
      if (index + 1 < countPoint) {
        setIndex(index + 1)
        return
      }
      if (index + 1 == countPoint) {
        if (checkEmpty(measurData.inputs[countPoint - 1])) {
          alertMsg("Не все поля заполнены!")
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
    return props?.map((item, indexInput) => (
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
  }

  function LastInputBlock({ lastInputText }) {
    const [value, setValue] = useState(lastInputText)
    return (
      <View>
        <Text>
          "Положение анцапфы (переключателя) силового трансформатора. При
          визуальной доступности!"
        </Text>
        <TextInput
          style={css.measurs_input}
          value={value}
          onChangeText={(text) => {
            setValue(text)
            measurData.lastInput = text
          }}
        />
      </View>
    )
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
                  alertSelection(
                    "",
                    msg,
                    {
                      text: "Да",
                      func: () => {
                        measurData.inputs.pop()
                        setIndex(index - 1)
                        setCountPoint(measurData.inputs.length)
                      },
                    },
                    { func: () => console.log("click cancel"), text: "Отмена" }
                  )
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
          <LastInputBlock lastInputText={measurData.lastInput} />
        )}
        {measurs && (
          <TouchableOpacity
            style={[css.touchBtn, css.btn_green, css.measurs_btnAdd]}
            onPress={() => {
              if (checkEmpty(measurData.inputs[countPoint - 1])) {
                alertMsg("Не все поля заполнены!")
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
          dd={dataDelegation}
          getData={getDataDelegation}
        />
      )}
      {typeContent == "measurements" && <MeusurementBlock />}

      <WrBtnThree fCancel={fCancel} fBack={fBack} fNext={fNext} />
    </View>
  )
}
