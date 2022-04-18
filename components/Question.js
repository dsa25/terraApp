import React, { useState } from "react"
import { View, FlatList, Text, Button } from "react-native"
import { Checkbox } from "react-native-paper"

import { css } from "../assets/css"

import {
  AnswerText,
  AnswerInput,
  clearFields,
  AnswerRadio,
  AnswerCheckBox,
  AnswerTextInput,
  AnswerRadioInput,
  AnswerListTextInput,
} from "./Answers"

export function Question({ dataQuests, closeStart }) {
  const [question, setQuestion] = useState(dataQuests.questions[0])

  function TypeAnswer({ props }) {
    if (props.type == "text") return <AnswerText props={props} />
    if (props.type == "input") return <AnswerInput props={props} />
    if (props.type == "textInput") return <AnswerTextInput props={props} />
    if (props.type == "radio") return <AnswerRadio props={props} />
    if (props.type == "checkbox") return <AnswerCheckBox props={props} />
    if (props.type == "radioInput") return <AnswerRadioInput props={props} />
    return null
  }

  const renderItem = ({ item }) => (
    <View style={[css.wr_checkbox]}>
      {item.type != "listTextInput" && (
        <Text>
          <Checkbox
            color="#03a9f4"
            key={item.val.toString()}
            status={item.check ? "checked" : "unchecked"}
            onPress={() => {
              question.opt[item.val - 1].check = !item.check
              setQuestion({ ...question })
              if (!question.opt[item.val - 1].check) {
                clearFields(item)
              }
            }}
          />
          <Text>{item.val}</Text>
        </Text>
      )}
      <TypeAnswer props={item} />
    </View>
  )

  const getTitle = (id, headers) => {
    let result = false
    headers.forEach(function (item) {
      if (id >= item.index[0] && id <= item.index[1]) result = item.title
    })
    return result
  }
  let questionTitle = getTitle(question.id, dataQuests.headers)

  return (
    <View>
      <Text style={css.question_text}>
        <Text style={{ paddingRight: 10 }}>
          {question.id + " / " + dataQuests.questions.length}{" "}
        </Text>
        <Text style={css.question_name}> {dataQuests.name}</Text>
      </Text>

      {questionTitle && (
        <Text style={css.question_header}>{questionTitle}</Text>
      )}

      <Text style={css.question_text}>{question.quest}</Text>

      {question.opt[0].type != "listTextInput" ? (
        <FlatList
          scrollEnabled={false}
          data={question.opt}
          renderItem={renderItem}
          keyExtractor={(item) => item.val.toString()}
        />
      ) : (
        <AnswerListTextInput props={question.opt[0]} />
      )}

      <View style={css.wr_btns}>
        <View style={{ paddingRight: 50 }}>
          <Button
            style={{ margin: 40 }}
            color="#f44336"
            title="Назад"
            onPress={() => {
              if (question.id > 1) {
                let newQuest = dataQuests.questions[question.id - 2]
                setQuestion({ ...newQuest })
              } else {
                console.log("the start")
                closeStart(false)
              }
            }}
          />
        </View>
        <View>
          <Button
            title="Далее"
            onPress={() => {
              if (question.id < dataQuests.questions.length) {
                let newQuest = dataQuests.questions[question.id]
                setQuestion({ ...newQuest })
                // setlistCheckbox([...newQuest.opt])
              } else {
                console.log("the end")
                console.log(dataQuests)
              }
            }}
          />
        </View>
      </View>
    </View>
  )
}
