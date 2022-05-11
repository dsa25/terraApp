import React, { useState } from "react"
import { View, TextInput, Text } from "react-native"
import { Checkbox, RadioButton } from "react-native-paper"

import { css } from "../assets/css"

function AnswerText({ props }) {
  return <Text style={css.checkbox_text}>{props.text}</Text>
}

function AnswerInput({ props }) {
  const [lastInput, setLastInput] = useState(props.input)
  return (
    <TextInput
      style={css.input}
      multiline={true}
      // disabled={!props.check}
      editable={props.check}
      value={lastInput}
      onChangeText={(lastInput) => {
        // question.opt[props.val].input = lastInput
        props.input = lastInput
        setLastInput(lastInput)
      }}
      placeholder="укажите свой вариант"
    />
  )
}

function AnswerTextInput({ props }) {
  const [inputValue, setInputValue] = useState(props.input)
  return (
    <View style={css.wr_textInput}>
      <Text style={[css.checkbox_text, css.textInputText]}>{props.text}</Text>
      <TextInput
        style={css.textInput}
        multiline={false}
        editable={props.check}
        value={inputValue}
        keyboardType="numeric"
        onChangeText={(inputValue) => {
          props.input = inputValue
          setInputValue(inputValue)
        }}
      />
    </View>
  )
}

function RadioGroup({ props }) {
  const [radio, setRadio] = useState(props.radio.value)
  const result = props.radio.list?.map((item, index) => (
    <View style={css.wr_radio} key={index}>
      <RadioButton
        color="#3498db"
        value={index}
        disabled={!props.check}
        status={radio === index ? "checked" : "unchecked"}
        onPress={() => {
          props.radio.value = index
          setRadio(index)
        }}
      />
      <Text style={css.radio_label}>{item}</Text>
    </View>
  ))
  return result
}

function AnswerRadio({ props }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={[css.checkbox_text]}>{props.text}</Text>
      {props.check && <RadioGroup props={props} />}
    </View>
  )
}

function AnswerRadioInput({ props }) {
  return (
    <View style={{ flex: 1 }}>
      <AnswerTextInput props={props} />
      {props.check && <RadioGroup props={props} />}
    </View>
  )
}

function AnswerCheckBox({ props }) {
  const [checkBoxs, setCheckBoxs] = useState(props.checkbox)
  const CheckBoxGroup = checkBoxs.map((item, index) => (
    <View style={css.wr_radio} key={index}>
      <Checkbox
        color="#03a9f4"
        disabled={!props.check}
        status={item.check ? "checked" : "unchecked"}
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

function AnswerListTextInput({ props }) {
  const [list, setList] = useState(props.list)
  const listInput = props.list?.map((item, index) => (
    <View style={[css.wr_textInput, { marginBottom: 10 }]} key={index}>
      <Text style={[css.checkbox_text]}>{item.text}</Text>
      <TextInput
        style={[css.textInput, { minWidth: 100, width: "auto" }]}
        multiline={false}
        editable={true}
        value={item.input}
        keyboardType={item.keyboardType}
        onChangeText={(value) => {
          list[index].input = value
          setList([...list])
        }}
      />
    </View>
  ))
  return (
    <View style={{ flex: 1 }}>
      <Text style={[css.checkbox_text]}>{props.text}</Text>
      {listInput}
    </View>
  )
}

function clearFields(props) {
  if (props.type == "input") props.input = ""
  if (props.type == "textInput") props.input = ""
  if (props.type == "radio") props.radio.value = -1
  if (props.type == "checkbox")
    props.checkbox?.map((item) => (item.check = false))
  if (props.type == "radioInput") {
    props.radio.value = -1
    props.input = ""
  }
  return null
}

export {
  AnswerText,
  clearFields,
  AnswerInput,
  AnswerRadio,
  AnswerCheckBox,
  AnswerTextInput,
  AnswerRadioInput,
  AnswerListTextInput,
}
