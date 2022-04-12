import React, { useState } from "react"
import {
  View,
  FlatList,
  TextInput,
  Text,
  Button,
  ScrollView,
} from "react-native"
import { Formik, Field } from "formik"
import { Checkbox } from "react-native-paper"

import { css } from "../assets/css"

import { listQuestions } from "../components/listQuestions"

export default function Inspection({}) {
  // const [currentQuest, setCurrentQuest] = useState(0)
  const [question, setQuestion] = useState(listQuestions[0])
  // const [listCheckbox, setlistCheckbox] = useState(question.opt)
  // listCheckbox[listCheckbox.length - 1].text

  function AnswerText({ props }) {
    return <Text style={css.checkbox_text}>{props.text}</Text>
  }
  function AnswerInput({ props }) {
    const [lastInput, setLastInput] = useState(
      question.opt[props.val - 1].input
    )
    return (
      <TextInput
        style={css.input}
        multiline={true}
        // disabled={!props.check}
        editable={props.check}
        value={lastInput}
        onChangeText={(lastInput) => {
          question.opt[props.val - 1].input = lastInput
          setLastInput(lastInput)
        }}
        placeholder="укажите свой вариант"
      />
    )
  }

  function AnswerTextInput({ props }) {
    const [inputValue, setInputValue] = useState(
      question.opt[props.val - 1].input
    )
    return (
      <View style={css.wr_textInput}>
        <Text style={[css.checkbox_text, css.textInputText]}>{props.text}</Text>
        <TextInput
          style={css.textInput}
          multiline={false}
          editable={props.check}
          value={inputValue}
          onChangeText={(inputValue) => {
            question.opt[props.val - 1].input = inputValue
            setInputValue(inputValue)
          }}
          placeholder="%"
        />
      </View>
    )
  }

  function TypeAnswer({ props }) {
    if (props.type == "text") return <AnswerText props={props} />
    if (props.type == "input") return <AnswerInput props={props} />
    if (props.type == "textInput") return <AnswerTextInput props={props} />
    return null
  }

  const renderItem = ({ item }) => (
    <View style={css.wr_checkbox}>
      <Checkbox
        color="#03a9f4"
        key={item.val.toString()}
        status={item.check ? "checked" : "unchecked"}
        onPress={() => {
          question.opt[item.val - 1].check = !item.check
          setQuestion({ ...question })
        }}
      />
      <TypeAnswer props={item} />
    </View>
  )

  // console.log(question)
  // console.log(typeof question[0])
  // console.log(question.opt.length)
  // console.log("text : ", question.opt[question.opt.length - 1].text)
  // console.log("text2 : ", listCheckbox[listCheckbox.length - 1].text)

  return (
    <ScrollView style={css.pages}>
      <Text style={css.question_text}>
        {question.id + " / " + listQuestions.length}
      </Text>
      <Text style={css.question_text}>
        {question.id + ") " + question.quest}
      </Text>
      <FlatList
        scrollEnabled={false}
        // data={listCheckbox}
        data={question.opt}
        renderItem={renderItem}
        keyExtractor={(item) => item.val.toString()}
      />
      <View style={css.wr_btns}>
        <View style={{ paddingRight: 50 }}>
          <Button
            style={{ margin: 40 }}
            color="#f44336"
            title="Назад"
            onPress={() => {
              if (question.id > 1) {
                let newQuest = listQuestions[question.id - 2]
                setQuestion({ ...newQuest })
              } else console.log("the start")
            }}
          />
        </View>
        <View>
          <Button
            title="Далее"
            onPress={() => {
              if (question.id < listQuestions.length) {
                let newQuest = listQuestions[question.id]
                setQuestion({ ...newQuest })
                // setlistCheckbox([...newQuest.opt])
              } else {
                console.log("the end")
                console.log(listQuestions)
              }
            }}
          />
        </View>
      </View>
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
