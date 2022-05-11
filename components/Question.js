import React, { useState, useEffect } from "react"
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
  udateItemInspectionHistory,
  isEmptyMaster,
  goHomeAfterSave,
  getUsers,
  checkAnswers,
} from "./func"

import { delegationData } from "../data/delegationData"
import { Delegation } from "./Delegation"
import { WrBtnThree } from "./WrBtnThree"

import { Measurements } from "./Measurements"

export function Question({ dataQuests, closeStart, navigation, mode, DL }) {
  const doneList = {}

  dataQuests = mode == "edit" ? DL.DL.quests : dataQuests

  const [dataDelegation, setDataDelegation] = useState(
    mode == "edit" ? DL.DL.delegation : deepClone(delegationData)
  )

  const [typeContent, setTypeContent] = useState("delegation")
  const [question, setQuestion] = useState(dataQuests.questions[0])

  const [users, setUsers] = useState(0)

  function getDataDelegation(data) {
    setDataDelegation(data)
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
              color="#3498db"
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
    if (typeContent == "delegation") {
      if (!dataDelegation || checkEmptyChild(dataDelegation.fields)) {
        alertMsg("Не заполнены поля!")
        return
      }
      if (isEmptyMaster(dataDelegation.users.master, users)) {
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
      // если заполнены все поля и боксы
      if (checkAnswers(question.opt)) {
        if (question.id < dataQuests.questions.length) {
          let newQuest = dataQuests.questions[question.id]
          setQuestion({ ...newQuest })
        } else {
          let funcOk = () => {
            setTypeContent("measurements")
          }
          let funcNo = async () => {
            doneList.delegation = dataDelegation
            doneList.quests = dataQuests
            let itemHistory = {
              id: 0,
              keyLS: Date.now(),
              v: 1,
              date: dataDelegation.date,
              address: dataDelegation.fields[1].input,
              fio: dataDelegation.users.master.fio,
              status: "local",
              measur: 0,
              type: dataQuests.type,
              DL: doneList,
            }
            if (mode == "edit") {
              itemHistory.id = DL.id
              itemHistory.v = DL.v + 1
              itemHistory.keyLS = DL.keyLS
              itemHistory.file = DL.file
              await udateItemInspectionHistory(itemHistory)
            } else {
              await addItemInspectionHistory(itemHistory)
            }
            alertMsg("Сохранено!")
            closeStart(false)
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
      <View style={{ paddingLeft: 8 }}>
        <Text style={css.question_text}>
          <Text
            style={[css.question_name, css.color_gold, { paddingRight: 10 }]}
          >
            {question.id + " / " + dataQuests.questions.length}{" "}
          </Text>
          <Text style={css.question_name}> {dataQuests.name}</Text>
        </Text>

        {questionTitle && (
          <Text style={css.question_header}>{questionTitle}</Text>
        )}

        <Text style={[css.question_text, css.question_quest]}>
          {question.quest}
        </Text>

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

  useEffect(() => {
    if (users == 0) {
      const testFunc = async () => {
        try {
          let us = await getUsers()
          if (us != null) {
            if (mode == "edit") {
              let other = []
              dataDelegation.users.other.forEach((ddElem) => {
                let res = us.find((item) => {
                  return item.id == ddElem.id
                })
                if (res != undefined) other.push(ddElem)
              })
              dataDelegation.users.other = other
            }
            setUsers([...us])
          }
        } catch (error) {
          console.error(error)
        }
      }
      testFunc()
    }
  }, [])

  return (
    <View>
      {typeContent == "delegation" && (
        <Delegation
          type={dataQuests.type}
          dd={dataDelegation}
          getData={getDataDelegation}
          users={users}
        />
      )}

      {typeContent == "quest" && <Quest />}

      {typeContent == "measurements" && (
        <Measurements
          call={"two"}
          typeQuest={"quest"}
          mode={mode}
          DL={DL}
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
