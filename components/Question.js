import React, { useState } from "react"
import { View, Text, Alert } from "react-native"
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

import { checkEmptyChild, checkOneChecked } from "./func"

import { delegationData } from "../data/delegationData"
import { Delegation } from "./Delegation"
import { WrBtnThree } from "./WrBtnThree"

// const cloneDataDelegation = {...delegationData}
// const cloneDataDelegation = Object.assign({}, delegationData)

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function Question({ dataQuests, closeStart }) {
  const [dataDelegation, setDataDelegation] = useState(
    deepClone(delegationData)
  )
  const [typeContent, setTypeContent] = useState("delegation")
  const [question, setQuestion] = useState(dataQuests.questions[0])

  function getDataDelegation(data) {
    setDataDelegation(data)
    console.log("getData", data)
  }

  function TypeAnswer({ props }) {
    if (props.type == "text") return <AnswerText props={props} />
    if (props.type == "input") return <AnswerInput props={props} />
    if (props.type == "textInput") return <AnswerTextInput props={props} />
    if (props.type == "radio") return <AnswerRadio props={props} />
    if (props.type == "checkbox") return <AnswerCheckBox props={props} />
    if (props.type == "radioInput") return <AnswerRadioInput props={props} />
    return null
  }

  function ListAnswer({ list }) {
    const result = list?.map((item, index) => (
      <View style={[css.wr_checkbox]} key={index}>
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
    ))
    return result
  }

  const fCancel = () => {
    console.log("the end")
    setDataDelegation(deepClone(delegationData))
    closeStart(false)
  }

  function fBack() {
    if (typeContent == "quest") {
      if (question.id > 1) {
        let newQuest = dataQuests.questions[question.id - 2]
        setQuestion({ ...newQuest })
      } else {
        setTypeContent("delegation")
        return
      }
    }
  }

  function fNext() {
    console.log("dataDelegation", dataDelegation)

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
      setTypeContent("quest")
      return
    }

    if (typeContent == "quest") {
      if (question.id < dataQuests.questions.length) {
        let newQuest = dataQuests.questions[question.id]
        setQuestion({ ...newQuest })
        // setlistCheckbox([...newQuest.opt])
      } else {
        console.log("the end")
        console.log(dataQuests)
      }
    }
  }

  const getTitle = (id, headers) => {
    let result = false
    headers.forEach(function (item) {
      if (id >= item.index[0] && id <= item.index[1]) result = item.title
    })
    return result
  }

  function Quest() {
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
          <ListAnswer list={question.opt} />
        ) : (
          <AnswerListTextInput props={question.opt[0]} />
        )}
      </View>
    )
  }

  return (
    <View>
      {typeContent == "delegation" && (
        <Delegation
          type={dataQuests.type}
          data={dataDelegation}
          getData={getDataDelegation}
        />
      )}
      {typeContent == "quest" && <Quest />}
      <WrBtnThree fCancel={fCancel} fBack={fBack} fNext={fNext} />
    </View>
  )
}
