import React, { useState } from "react"
import { Text, View, TextInput } from "react-native"
import { Checkbox, RadioButton } from "react-native-paper"

import { css } from "../assets/css"
import { getTime, getPost } from "./func"

let myName = ""
export function Delegation({ type, dd, getData, users }) {
  // const [data, setData] = useState(dd)
  const data = dd

  // let other = []

  data.users.text = type == "measurements" ? data.headers2[0] : data.headers2[1]
  data.date = dd.date === "" ? getTime() : data.date

  function DateInput() {
    const [input1, setInput1] = useState(data.date)
    return (
      <TextInput
        style={css.input_date}
        value={input1}
        keyboardType={"numeric"}
        onChangeText={(text) => {
          data.date = text
          setInput1(data.date)
        }}
      />
    )
  }

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
      if (item.post > 1 && item.status == 1) myList.push(item)
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
          color="#3498db"
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
          {item.fio}
          {"  "}
          {getPost(item.post)}
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
          color="#3498db"
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
      <Text style={[css.colorBlack, { fontSize: 15 }]}>
        {type == "measurements" ? data.headers[0] : data.headers[1]}{" "}
      </Text>
      <DateInput />
      <LabelInput props={data.fields[0]} />
      <LabelInput props={data.fields[1]} />
      <Text style={css.colorBlack}>Напряжение:</Text>
      <LabelInput props={data.fields[2]} />
      <LabelInput props={data.fields[3]} />
      <LabelInput props={data.fields[4]} />

      <Text style={[css.colorBlack, { marginTop: 10 }]}>{data.users.text}</Text>
      <RadioGroup props={users} />
      <ListCheckBox props={users} />
    </View>
  )
}
