import React, { useState } from "react"
import { Text, View, TextInput } from "react-native"
import { Checkbox, RadioButton } from "react-native-paper"

import { css } from "../assets/css"
import { getTime } from "./func"

let myName = ""
export function Delegation({ type, dd, getData, users }) {
  // const [data, setData] = useState(dd)
  const data = dd

  // let other = []

  data.users.text = type == "measurements" ? data.headers2[0] : data.headers2[1]
  data.date = getTime()

  function LabelInput({ props }) {
    const [input, setInput] = useState(props.input)
    return (
      <View style={css.measurs_item}>
        <Text style={css.measurs_label}>{props.label}</Text>
        <TextInput
          style={css.measurs_input}
          value={props.input}
          keyboardType={props.keyboardType}
          onChangeText={(text) => {
            props.input = text
            setInput(props.input)
            // getData(data)
          }}
        />
      </View>
    )
  }

  function ListCheckBox({ props }) {
    if (props == 0)
      return (
        <Text>
          Загрузите пользователей в настройках и начните осмотр сначала (нажав
          "завершить")
        </Text>
      )
    let myList = []
    props.forEach((item) => {
      if (item.post == 0 && item.status == 1) myList.push(item)
    })
    if (data.users.other.length > 0) {
      myList.forEach((item) => {
        if (data.users.other.find((elem) => elem.id === item.id) != undefined)
          item.check = true
      })
    }
    const [checkBoxs, setCheckBoxs] = useState(myList)
    const result = myList.map((item, index) => (
      <View style={css.wr_radio} key={index}>
        <Checkbox
          color="#03a9f4"
          // disabled={!props.check}
          // disabled={item.text === myName}
          status={
            data.users.other.find((elem) => elem.id === item.id) != undefined
              ? "checked"
              : "unchecked"
          }
          // status={item.text === myName ? "checked" : "unchecked"}
          onPress={() => {
            checkBoxs[index].check = !item.check
            setCheckBoxs([...checkBoxs])
            if (item.check) data.users.other.push(item)
            if (!item.check) {
              data.users.other = data.users.other.filter(
                (elem) => elem.id != item.id
              )
            }
          }}
        />
        <Text style={css.radio_label}>
          {item.fio} {item.post == 1 ? " (мастер)" : " (электромонтер)"}
        </Text>
      </View>
    ))
    return result
  }

  function RadioGroup({ props }) {
    if (props == 0) return <Text>Пользователей нет!</Text>
    let myList = []
    props.forEach((item) => {
      if (item.post == 1 && item.status == 1) myList.push(item)
    })
    const [radio, setRadio] = useState(-1)
    const result = myList?.map((item, index) => (
      <View style={css.wr_radio} key={index}>
        <RadioButton
          color="#03a9f4"
          value={index}
          // disabled={!props.check}
          status={item.id === data.users.master.id ? "checked" : "unchecked"}
          onPress={() => {
            setRadio(index)
            data.users.master = item
          }}
        />
        <Text style={css.radio_label}>
          {item.fio} {item.post == 1 ? " (мастер)" : " (электромонтер)"}
        </Text>
      </View>
    ))
    return result
  }

  return (
    <View>
      <Text>
        {type == "measurements" ? data.headers[0] : data.headers[1]}{" "}
        <Text>{data.date}</Text>
      </Text>
      <LabelInput props={data.fields[0]} />
      <LabelInput props={data.fields[1]} />
      <Text>Напряжение:</Text>
      <LabelInput props={data.fields[2]} />
      <LabelInput props={data.fields[3]} />
      <LabelInput props={data.fields[4]} />

      <Text>{data.users.text}</Text>
      <RadioGroup props={users} />
      <ListCheckBox props={users} />
    </View>
  )
}
