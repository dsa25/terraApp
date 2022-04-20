import React, { useState } from "react"
import { Text, View, TextInput } from "react-native"
import { Checkbox } from "react-native-paper"

import { css } from "../assets/css"
import { AnswerCheckBox } from "./Answers"

function getTime() {
  let time = new Date()
  let dd = time.getDate()
  let mo = time.getMonth() + 1
  let yy = time.getFullYear().toString()
  if (mo < 10) mo = "0" + mo
  if (dd < 10) dd = "0" + dd
  return `${dd}.${mo}.${yy}`
}

export function Delegation({ type, data, getData }) {
  data.users.text = type == "measurements" ? data.headers2[0] : data.headers2[1]
  data.date = getTime()
  console.log("datadata", data)

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
            // setData({ ...data })
            console.log(data.fields)
            getData(data)
          }}
        />
      </View>
    )
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
        <AnswerCheckBox props={data.users} />
      </View>
    </View>
  )
}
