import React, { useState } from "react"
import { View, Text } from "react-native"
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

import {
  checkEmptyChild,
  deepClone,
  alertSelection,
  alertMsg,
  addItemInspectionHistory,
  setDoneList,
  isEmpty,
  goHomeAfterSave,
} from "./func"

import { delegationData } from "../data/delegationData"
import { Delegation } from "./Delegation"
import { WrBtnThree } from "./WrBtnThree"

// const cloneDataDelegation = {...delegationData}
// const cloneDataDelegation = Object.assign({}, delegationData)

import { Measurements } from "./Measurements"

export function Question({ dataQuests, closeStart, navigation }) {
  const doneList = {}

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
    alertSelection(
      "Вы точно хотите завершить осмотр?",
      "Указанные данные будут удалены!",
      {
        text: "Да",
        func: () => {
          setDataDelegation(deepClone(delegationData))
          closeStart(false)
        },
      },
      {
        func: () => {},
        text: "Отмена",
      }
    )
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
        alertMsg("Не заполнены поля!")
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
      setTypeContent("quest")
      return
    }

    if (typeContent == "quest") {
      if (question.id < dataQuests.questions.length) {
        let newQuest = dataQuests.questions[question.id]
        setQuestion({ ...newQuest })
      } else {
        let funcOk = () => {
          setTypeContent("measurements")
        }
        let funcNo = async () => {
          let itemHistory = {
            id: "__",
            v: 1,
            date: dataDelegation.date,
            address: dataDelegation.fields[1].input,
            fio: dataDelegation.users.master.fio,
            key: "key_" + Date.now(),
            status: "local",
            measur: false,
            type: dataQuests.type,
          }
          await addItemInspectionHistory(itemHistory)
          doneList.type = "quest"
          doneList.measur = false
          doneList.delegation = dataDelegation
          doneList.quests = dataQuests
          await setDoneList(itemHistory.key, doneList)
          alertMsg("Успешно!")
          closeStart(false)
          console.log("doneList", doneList)
          await goHomeAfterSave(navigation)
        }
        alertSelection(
          "Заполнить бланк замеров?",
          'Нажимая "Сохранить" осмотр завершается и сохраняется без бланка замеров',
          { func: funcOk, text: "Продолжить" },
          { func: funcNo, text: "Сохранить" }
        )
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

  function CloseMeasurTwo(value = "two") {
    value == "exit" ? closeStart(false) : setTypeContent("quest")
  }

  return (
    <View>
      {typeContent == "delegation" && (
        <Delegation
          type={dataQuests.type}
          dd={dataDelegation}
          getData={getDataDelegation}
        />
      )}

      {typeContent == "quest" && <Quest />}

      {typeContent == "measurements" && (
        <Measurements
          call={"two"}
          typeQuest={"quest"}
          getDD={dataDelegation}
          dataQuests={dataQuests}
          closeStart={CloseMeasurTwo}
          navigation={navigation}
        />
      )}

      {typeContent != "measurements" && (
        <WrBtnThree fCancel={fCancel} fBack={fBack} fNext={fNext} />
      )}
    </View>
  )
}
