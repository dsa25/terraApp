import React, { useState } from "react"
import {
  View,
  FlatList,
  TextInput,
  Text,
  Button,
  ScrollView,
} from "react-native"
import { Checkbox } from "react-native-paper"

import { css } from "../assets/css"

import { buildingPart } from "../data/buildingPart"
import { mastTransformer } from "../data/mastTransformer"
import {
  AnswerText,
  AnswerInput,
  clearFields,
  AnswerRadio,
  AnswerCheckBox,
  AnswerTextInput,
  AnswerRadioInput,
  AnswerListTextInput,
} from "../components/Answers"

export default function Inspection({}) {
  // const [currentQuest, setCurrentQuest] = useState(0)
  const [question, setQuestion] = useState(buildingPart.questions[0])
  // const [listCheckbox, setlistCheckbox] = useState(question.opt)
  // listCheckbox[listCheckbox.length - 1].text

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
  let questionTitle = getTitle(question.id, buildingPart.headers)

  return (
    <ScrollView style={css.pages}>
      <Text style={css.question_text}>
        <Text style={{ paddingRight: 10 }}>
          {question.id + " / " + buildingPart.questions.length}{" "}
        </Text>
        <Text style={css.question_name}> {buildingPart.name}</Text>
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
                let newQuest = buildingPart.questions[question.id - 2]
                setQuestion({ ...newQuest })
              } else console.log("the start")
            }}
          />
        </View>
        <View>
          <Button
            title="Далее"
            onPress={() => {
              if (question.id < buildingPart.questions.length) {
                let newQuest = buildingPart.questions[question.id]
                setQuestion({ ...newQuest })
                // setlistCheckbox([...newQuest.opt])
              } else {
                console.log("the end")
                console.log(buildingPart)
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
