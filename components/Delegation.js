import React, { useState, useEffect } from "react"
import { Text, View, TextInput } from "react-native"
import { Checkbox } from "react-native-paper"

import { css } from "../assets/css"
import { AnswerCheckBox } from "./Answers"
import { getTime, getUsers, getUsersForDelegation, getMyName } from "./func"

let myName = ""
export function Delegation({ type, dd, getData }) {
  // const [data, setData] = useState(dd)
  const data = dd
  const [users, setUsers] = useState(data.users)
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
          onChangeText={(text) => {
            props.input = text
            setInput(props.input)
            // getData(data)
          }}
        />
      </View>
    )
  }

  function AnswerCheckBox({ props }) {
    const [checkBoxs, setCheckBoxs] = useState(props.checkbox)
    const CheckBoxGroup = checkBoxs?.map((item, index) => (
      <View style={css.wr_radio} key={index}>
        <Checkbox
          color="#03a9f4"
          // disabled={!props.check}
          disabled={item.text === myName}
          status={item.check ? "checked" : "unchecked"}
          // status={item.text === myName ? "checked" : "unchecked"}
          onPress={() => {
            checkBoxs[index].check = !item.check
            setCheckBoxs([...checkBoxs])
          }}
        />
        <Text style={css.radio_label}>{item.text}</Text>
      </View>
    ))
    return (
      <View style={{ flex: 1 }}>
        <Text style={[css.checkbox_text]}>{props.text}</Text>
        {props.check && CheckBoxGroup}
      </View>
    )
  }

  useEffect(() => {
    if (data.users.checkbox.length == 0) {
      const testFunc = async () => {
        try {
          let us = await getUsers()
          if (us != null && us.list != undefined) {
            users.checkbox = getUsersForDelegation(us.list)
            if (myName == "") myName = await getMyName()
            users.checkbox.forEach((item) => {
              if (item.text == myName) item.check = true
            })
            setUsers({ ...users })
            console.log("users", users)
          }
        } catch (error) {
          console.error(error)
        }
      }
      testFunc()
      console.log("useEffect")
    }
  }, [])

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

      <View style={[css.wr_checkbox]}>
        {/* <Checkbox
          color="#03a9f4"
          status={data.users.check ? "checked" : "unchecked"}
          onPress={() => {
            data.users.check = !data.users.check
            setData({ ...data })
            getData(data)
          }}
        /> */}
        <AnswerCheckBox props={users} />
      </View>
    </View>
  )
}
